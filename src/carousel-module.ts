import * as THREE from 'three';
import { ErrorRecovery } from './error-recovery';

/**
 * Ancoraggio ibrido:
 * - posizione sul marker (avvicinamento fisico)
 * - scala contenuti in base allo schermo (all'apertura)
 * - pannelli allineati alla camera
 * - smoothing continuo (niente scarti bruschi → meno movimento "a tratti")
 */
export class Carousel3D {
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;

  private triggerMesh: THREE.Mesh | null = null;
  private carouselGroup: THREE.Group | null = null;

  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;

  public isTriggerVisible = false;
  public isCarouselOpen = false;
  public onTriggerClicked?: () => void;

  private images: THREE.Mesh[] = [];
  private currentIndex = 0;
  private slideSpacing = 1.15;

  /** Solo posizione marker (scala marker ignorata: altrimenti sfera/immagini esplodono). */
  private activeContainer: THREE.Group = new THREE.Group();
  private billboardGroup: THREE.Group = new THREE.Group();

  private trackingEnabled = true;
  private hasPose = false;
  private smoothed = new THREE.Vector3();
  private targetPos = new THREE.Vector3();

  private readonly _camPos = new THREE.Vector3();
  private readonly _camQuat = new THREE.Quaternion();
  private readonly _parentQuat = new THREE.Quaternion();
  private readonly _parentQuatInv = new THREE.Quaternion();
  private readonly _desiredBillboard = new THREE.Quaternion();
  private readonly _faceCamera = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);

  private readonly clock = new THREE.Clock();
  /** Tracking: più alto = più reattivo. */
  private readonly posLambdaNormal = 10;
  private readonly posLambdaRecovery = 6;
  private readonly billboardLambda = 14;
  /** Max m/s di correzione posa. */
  private readonly maxSpeedNormal = 2.5;
  private readonly maxSpeedRecovery = 1.4;

  private posLambda = this.posLambdaNormal;
  private maxSpeed = this.maxSpeedNormal;
  private recoveryUntilMs = 0;
  /** Recovery breve: solo per assorbire il riaggancio, non rallentare tutto. */
  private readonly recoveryDurationMs = 350;

  /** Frazione target dello schermo all'apertura (poi scala mondo fissa → zoom avvicinandoti). */
  private readonly screenFill = 0.68;
  private contentLocalSize = 1;
  /** Scala mondo fissata all'apertura: non ricalibrata, così l'avvicinamento ingrandisce i dettagli. */
  private scaleAtOpen = 1;

  /** Congela solo dopo perdita prolungata (micro-lost da avvicinamento non bloccano subito). */
  private lostSinceMs: number | null = null;
  private readonly loseGraceMs = 900;

  /**
   * Sfera trigger: diametro ≈ % del lato corto dello schermo (indipendente da
   * dimensione fisica del marker / risoluzione telefono).
   */
  private readonly triggerScreenFill = 0.30;
  private readonly triggerLocalDiameter = 1;
  private triggerScaleSmoothed = 0.2;
  private readonly triggerScaleLambda = 8;

  constructor(scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.activeContainer.add(this.billboardGroup);
    this.scene.add(this.activeContainer);

    this.setupTouchHandler();
    this.setupLighting();
  }

  private setupLighting() {
    this.scene.add(new THREE.AmbientLight(0xffffff, 1.0));
  }

  private setupTouchHandler() {
    window.addEventListener(
      'touchstart',
      (e) => {
        if (!this.triggerMesh?.visible || e.touches.length === 0) return;

        this.mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        if (this.raycaster.intersectObject(this.triggerMesh, true).length > 0) {
          e.preventDefault();
          this.onTriggerClicked?.();
        }
      },
      { passive: false }
    );
  }

  public showTrigger(detail: any) {
    if (!this.triggerMesh) {
      // Geometria unitaria (diametro locale = 1): la scala la fa updateTriggerScale → % schermo
      const r = this.triggerLocalDiameter * 0.5;
      const geo = new THREE.SphereGeometry(r, 20, 20);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x00d2ff,
        transparent: true,
        opacity: 0.75,
        wireframe: true,
        depthTest: false,
      });
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(r * 0.5, 24, 24),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.95,
          depthTest: false,
        })
      );
      this.triggerMesh = new THREE.Mesh(geo, mat);
      this.triggerMesh.add(core);
      this.triggerMesh.renderOrder = 999;
      // Leggero lift sopra il centro del marker (in unità locali della sfera)
      this.triggerMesh.position.set(0, this.triggerLocalDiameter * 0.55, 0);
      this.activeContainer.add(this.triggerMesh);
    }

    this.trackingEnabled = true;
    this.lostSinceMs = null;
    this.triggerMesh.visible = true;
    this.isTriggerVisible = true;
    this.applyPoseFromDetail(detail, true);
    // Prima stima immediata (poi smoothing in update)
    this.triggerScaleSmoothed = this.computeScreenFitScale(
      this.triggerLocalDiameter,
      this.triggerScreenFill
    );
    this.triggerMesh.scale.setScalar(this.triggerScaleSmoothed);
  }

  public hideTrigger() {
    if (this.triggerMesh) this.triggerMesh.visible = false;
    this.isTriggerVisible = false;
  }

  public spawnCarousel(imagePaths: string[]) {
    this.hideTrigger();
    this.currentIndex = 0;
    this.disposeCarousel();

    this.carouselGroup = new THREE.Group();
    this.billboardGroup.position.set(0, 0.08, 0);
    this.billboardGroup.scale.setScalar(1);
    this.billboardGroup.add(this.carouselGroup);
    this.images = [];
    this.isCarouselOpen = true;
    this.trackingEnabled = true;
    this.lostSinceMs = null;
    this.recoveryUntilMs = 0;
    this.posLambda = this.posLambdaNormal;
    this.maxSpeed = this.maxSpeedNormal;
    this.slideSpacing = 1.15;

    this.contentLocalSize = 1;
    const openScale = this.computeScreenFitScale(1, this.screenFill);
    this.scaleAtOpen = openScale;
    this.billboardGroup.scale.setScalar(openScale);

    const loader = new THREE.TextureLoader();
    imagePaths.forEach((path, i) => {
      const loadPromise = new Promise<THREE.Texture>((resolve, reject) => {
        loader.load(path, resolve, undefined, reject);
      });

      // Timeout + errori rete/asset → banner recovery
      ErrorRecovery.withTimeout(loadPromise, path)
        .then((texture: THREE.Texture) => {
          if (!this.carouselGroup) {
            texture.dispose();
            return;
          }
          texture.colorSpace = THREE.SRGBColorSpace;
          // Mipmap: da vicino meno shimmering / picchi GPU su texture grandi
          texture.generateMipmaps = true;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy?.() || 1);

          const img = texture.image as { width?: number; height?: number } | undefined;
          const aspect = img?.width && img?.height ? img.width / img.height : 1;
          // Lato lungo = 1 in unità locali; fit scale porta il lato lungo a screenFill
          const w = aspect >= 1 ? 1 : aspect;
          const h = aspect >= 1 ? 1 / aspect : 1;
          const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(w, h),
            new THREE.MeshBasicMaterial({
              map: texture,
              side: THREE.DoubleSide,
              depthTest: true,
            })
          );
          mesh.position.x = i * this.slideSpacing;
          this.carouselGroup.add(mesh);
          this.images.push(mesh);

          // Fit una sola volta all'apertura: da qui scala mondo fissa → zoom fisico
          if (i === 0) {
            this.contentLocalSize = Math.max(w, h);
            const s = this.computeScreenFitScale(this.contentLocalSize, this.screenFill);
            this.scaleAtOpen = s;
            this.billboardGroup.scale.setScalar(s);
          }
        })
        .catch((err: unknown) => {
          console.error('❌ Texture carosello fallita:', path, err);
        });
    });
  }

  /** Scala mondo affinché `localSize` occupi `fill` del lato corto dello schermo. */
  private computeScreenFitScale(localSize: number, fill: number, minDist = 0.35): number {
    const cam = this.camera as THREE.PerspectiveCamera;
    if (!cam.isPerspectiveCamera) return 0.35;

    this.camera.getWorldPosition(this._camPos);
    const dist = Math.max(minDist, this.activeContainer.position.distanceTo(this._camPos));
    const vFov = THREE.MathUtils.degToRad(cam.fov);
    const viewH = 2 * Math.tan(vFov / 2) * dist;
    const viewW = viewH * (cam.aspect || window.innerWidth / window.innerHeight);

    const target = Math.min(viewW, viewH) * fill;
    const localMax = Math.max(localSize, 1e-4);
    return THREE.MathUtils.clamp(target / localMax, 0.08, 2.5);
  }

  /** Sfera sempre ≈ triggerScreenFill del lato corto schermo (iPhone/Android, vicino/lontano). */
  private updateTriggerScale(dt: number) {
    if (!this.triggerMesh?.visible || this.isCarouselOpen) return;
    const target = this.computeScreenFitScale(this.triggerLocalDiameter, this.triggerScreenFill);
    const t = 1 - Math.exp(-this.triggerScaleLambda * dt);
    this.triggerScaleSmoothed += (target - this.triggerScaleSmoothed) * t;
    this.triggerMesh.scale.setScalar(this.triggerScaleSmoothed);
  }

  public hideCarousel() {
    this.disposeCarousel();
    this.isCarouselOpen = false;
    this.trackingEnabled = true;
    this.lostSinceMs = null;
    this.recoveryUntilMs = 0;
    this.posLambda = this.posLambdaNormal;
    this.maxSpeed = this.maxSpeedNormal;
    this.billboardGroup.scale.setScalar(1);
    this.billboardGroup.position.set(0, 0, 0);
  }

  private disposeCarousel() {
    if (!this.carouselGroup) return;

    this.carouselGroup.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.geometry?.dispose();
      const mat = mesh.material;
      if (Array.isArray(mat)) {
        mat.forEach((m) => {
          (m as THREE.MeshBasicMaterial).map?.dispose();
          m.dispose();
        });
      } else if (mat) {
        (mat as THREE.MeshBasicMaterial).map?.dispose();
        mat.dispose();
      }
    });

    this.billboardGroup.remove(this.carouselGroup);
    this.carouselGroup = null;
    this.images = [];
  }

  public slideLeft() {
    if (!this.carouselGroup) return;
    this.currentIndex = Math.max(0, this.currentIndex - 1);
  }

  public slideRight() {
    if (!this.carouselGroup) return;
    this.currentIndex = Math.min(Math.max(0, this.images.length - 1), this.currentIndex + 1);
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public getImagesCount(): number {
    return this.images.length;
  }

  public freezeTracking() {
    // Congela in mondo: l'immagine resta lì, avvicinarsi zoomma i dettagli.
    // (Niente follow-camera: quello annullava lo zoom.)
    this.trackingEnabled = false;
  }

  /** Segna perdita marker; congela solo dopo grace period (micro-lost da avvicinamento). */
  public noteTargetLost() {
    if (!this.isCarouselOpen) {
      this.freezeTracking();
      return;
    }
    if (this.lostSinceMs == null) this.lostSinceMs = performance.now();
  }

  public resumeTracking(detail?: any) {
    this.lostSinceMs = null;
    this.trackingEnabled = true;
    // Niente snap: rientro soft verso la nuova posa del marker
    this.beginRecovery();
    if (detail) this.applyPoseFromDetail(detail, false);
  }

  public isTrackingFrozen(): boolean {
    return !this.trackingEnabled;
  }

  public updateTargetTransform(detail: any) {
    const wasLost = this.lostSinceMs != null || !this.trackingEnabled;
    this.lostSinceMs = null;
    if (!this.trackingEnabled) {
      this.trackingEnabled = true;
    }
    if (wasLost) this.beginRecovery();
    // Mai force=true: evita salti al riaggancio
    this.applyPoseFromDetail(detail, false);
  }

  private beginRecovery() {
    this.recoveryUntilMs = performance.now() + this.recoveryDurationMs;
    this.posLambda = this.posLambdaRecovery;
    this.maxSpeed = this.maxSpeedRecovery;
  }

  private refreshMotionParams() {
    if (performance.now() < this.recoveryUntilMs) {
      this.posLambda = this.posLambdaRecovery;
      this.maxSpeed = this.maxSpeedRecovery;
    } else {
      this.posLambda = this.posLambdaNormal;
      this.maxSpeed = this.maxSpeedNormal;
    }
  }

  private applyPoseFromDetail(detail: any, force = false) {
    const { position } = detail;
    if (!position) return;
    if (![position.x, position.y, position.z].every(Number.isFinite)) return;

    this.targetPos.set(position.x, position.y, position.z);

    // Snap solo al primo pose (apertura trigger), mai al resume carosello
    if (!this.hasPose || (force && !this.isCarouselOpen)) {
      this.smoothed.copy(this.targetPos);
      this.hasPose = true;
      this.flushPoseToContainer();
    }
  }

  private flushPoseToContainer() {
    this.activeContainer.position.copy(this.smoothed);
    this.activeContainer.scale.set(1, 1, 1);
    this.activeContainer.quaternion.identity();
  }

  private updateBillboard(dt: number) {
    if (!this.isCarouselOpen) return;

    this.camera.getWorldQuaternion(this._camQuat);
    this.activeContainer.getWorldQuaternion(this._parentQuat);
    this._parentQuatInv.copy(this._parentQuat).invert();
    this._desiredBillboard.copy(this._parentQuatInv).multiply(this._camQuat).multiply(this._faceCamera);

    const t = 1 - Math.exp(-this.billboardLambda * dt);
    this.billboardGroup.quaternion.slerp(this._desiredBillboard, t);
  }

  public update() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.refreshMotionParams();

    if (
      this.isCarouselOpen &&
      this.lostSinceMs != null &&
      this.trackingEnabled &&
      performance.now() - this.lostSinceMs >= this.loseGraceMs
    ) {
      this.freezeTracking();
    }

    if (this.hasPose && this.trackingEnabled) {
      // Lerp esponenziale + limite velocità (niente scarti improvvisi → meno "a tratti")
      const alpha = 1 - Math.exp(-this.posLambda * dt);
      const dx = this.targetPos.x - this.smoothed.x;
      const dy = this.targetPos.y - this.smoothed.y;
      const dz = this.targetPos.z - this.smoothed.z;
      let mx = this.smoothed.x + dx * alpha;
      let my = this.smoothed.y + dy * alpha;
      let mz = this.smoothed.z + dz * alpha;
      const stepLen = Math.hypot(mx - this.smoothed.x, my - this.smoothed.y, mz - this.smoothed.z);
      const maxStep = this.maxSpeed * dt;
      if (stepLen > maxStep && stepLen > 1e-8) {
        const k = maxStep / stepLen;
        mx = this.smoothed.x + (mx - this.smoothed.x) * k;
        my = this.smoothed.y + (my - this.smoothed.y) * k;
        mz = this.smoothed.z + (mz - this.smoothed.z) * k;
      }
      this.smoothed.set(mx, my, mz);
      this.flushPoseToContainer();
    }
    // Se tracking frozen: posa mondo ferma → avvicinarsi zoomma naturalmente

    if (this.triggerMesh && this.triggerMesh.visible) {
      this.triggerMesh.rotation.y += 0.025;
      this.triggerMesh.rotation.x += 0.012;
      // Oscillazione in unità locali (scala % schermo gestisce la grandezza)
      this.triggerMesh.position.y =
        this.triggerLocalDiameter * 0.55 + Math.sin(performance.now() * 0.003) * 0.08;
    }

    if (this.carouselGroup) {
      const targetX = -(this.currentIndex * this.slideSpacing);
      const slideT = 1 - Math.exp(-12 * dt);
      this.carouselGroup.position.x += (targetX - this.carouselGroup.position.x) * slideT;
      // Garantisce scala mondo fissa all'apertura (zoom solo da movimento fisico)
      this.billboardGroup.scale.setScalar(this.scaleAtOpen);
    }

    this.updateTriggerScale(dt);
    this.updateBillboard(dt);
  }
}
