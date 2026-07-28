import * as THREE from 'three';

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
  /** Velocità smoothing posizione (più alto = più reattivo, più basso = più stabile). */
  private readonly posLambda = 8;
  private readonly billboardLambda = 12;
  /** Max metri di correzione posa al secondo (evita scatti senza bloccare il movimento). */
  private readonly maxSpeed = 1.2;

  /** Frazione dello schermo occupata dal lato lungo dell'immagine. */
  private readonly screenFill = 0.68;

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
      // Piccola rispetto allo schermo / marker
      const geo = new THREE.SphereGeometry(0.055, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x00d2ff,
        transparent: true,
        opacity: 0.75,
        wireframe: true,
        depthTest: false,
      });
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.028, 24, 24),
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
      this.triggerMesh.position.set(0, 0.12, 0);
      this.activeContainer.add(this.triggerMesh);
    }

    this.trackingEnabled = true;
    this.triggerMesh.visible = true;
    this.isTriggerVisible = true;
    this.applyPoseFromDetail(detail, true);
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

    // Dimensione mondo ≈ % schermo alla distanza corrente (poi, avvicinandoti, ingrandisce)
    const fit = this.computeScreenFitScale(1, 1);
    this.billboardGroup.scale.setScalar(fit);
    this.slideSpacing = 1.15;

    const loader = new THREE.TextureLoader();
    imagePaths.forEach((path, i) => {
      loader.load(path, (texture) => {
        if (!this.carouselGroup) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        const aspect = texture.image ? texture.image.width / texture.image.height : 1;
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

        // Ricalcola fit sul primo asset reale (aspect corretto)
        if (i === 0) {
          const refW = Math.max(w, h);
          this.billboardGroup.scale.setScalar(this.computeScreenFitScale(refW, refW));
        }
      });
    });
  }

  /** Scala mondo affinché `localSize` occupi ~screenFill del lato corto dello schermo. */
  private computeScreenFitScale(localW: number, localH: number): number {
    const cam = this.camera as THREE.PerspectiveCamera;
    if (!cam.isPerspectiveCamera) return 0.35;

    this.camera.getWorldPosition(this._camPos);
    const dist = Math.max(0.25, this.activeContainer.position.distanceTo(this._camPos));
    const vFov = THREE.MathUtils.degToRad(cam.fov);
    const viewH = 2 * Math.tan(vFov / 2) * dist;
    const viewW = viewH * (cam.aspect || window.innerWidth / window.innerHeight);

    const target = Math.min(viewW, viewH) * this.screenFill;
    const localMax = Math.max(localW, localH, 1e-4);
    return THREE.MathUtils.clamp(target / localMax, 0.08, 2.5);
  }

  public hideCarousel() {
    this.disposeCarousel();
    this.isCarouselOpen = false;
    this.trackingEnabled = true;
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
    this.trackingEnabled = false;
  }

  public resumeTracking(detail?: any) {
    this.trackingEnabled = true;
    if (detail) this.applyPoseFromDetail(detail, true);
  }

  public isTrackingFrozen(): boolean {
    return !this.trackingEnabled;
  }

  public updateTargetTransform(detail: any) {
    if (!this.trackingEnabled) return;
    this.applyPoseFromDetail(detail, false);
  }

  private applyPoseFromDetail(detail: any, force = false) {
    const { position } = detail;
    if (!position) return;
    if (![position.x, position.y, position.z].every(Number.isFinite)) return;

    this.targetPos.set(position.x, position.y, position.z);

    if (!this.hasPose || force) {
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

    if (this.triggerMesh && this.triggerMesh.visible) {
      this.triggerMesh.rotation.y += 0.025;
      this.triggerMesh.rotation.x += 0.012;
      this.triggerMesh.position.y = 0.12 + Math.sin(performance.now() * 0.003) * 0.015;
    }

    if (this.carouselGroup) {
      const targetX = -(this.currentIndex * this.slideSpacing);
      const slideT = 1 - Math.exp(-10 * dt);
      this.carouselGroup.position.x += (targetX - this.carouselGroup.position.x) * slideT;
    }

    this.updateBillboard(dt);
  }
}
