import * as THREE from 'three';

export class Carousel3D {
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;

  private triggerMesh: THREE.Mesh | null = null;
  private carouselGroup: THREE.Group | null = null;
  
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;

  public isTriggerVisible = false;
  public onTriggerClicked?: () => void;

  private images: THREE.Mesh[] = [];
  
  // Scansione e ancoraggio
  private activeContainer: THREE.Group = new THREE.Group();

  constructor(scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.scene.add(this.activeContainer);
    
    this.setupTouchHandler();
    this.setupLighting();
  }

  private setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    this.scene.add(ambientLight);
  }

  private setupTouchHandler() {
    window.addEventListener('touchstart', (e) => {
      if(e.touches.length > 0) {
        this.mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        if (this.triggerMesh && this.triggerMesh.visible) {
          const intersects = this.raycaster.intersectObject(this.triggerMesh);
          if (intersects.length > 0) {
            if(this.onTriggerClicked) this.onTriggerClicked();
          }
        }
      }
    });
  }

  public showTrigger(detail: any) {
    if(!this.triggerMesh) {
      // Un indicatore più piccolo, accattivante ed elegante (stile olografico)
      const geo = new THREE.SphereGeometry(0.25, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x00d2ff, // ciano
        transparent: true,
        opacity: 0.7,
        wireframe: true,
        depthTest: false,
      });
      
      const coreGeo = new THREE.SphereGeometry(0.12, 32, 32);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        depthTest: false,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);

      this.triggerMesh = new THREE.Mesh(geo, mat);
      this.triggerMesh.add(coreMesh);

      this.triggerMesh.renderOrder = 999;
      // Alzalo leggermente per fluttuare sopra l'immagine
      this.triggerMesh.position.set(0, 0.4, 0); 
      this.activeContainer.add(this.triggerMesh);
    }
    
    this.triggerMesh.visible = true;
    this.isTriggerVisible = true;
    this.updateTargetTransform(detail);
  }

  public hideTrigger() {
    if(this.triggerMesh) this.triggerMesh.visible = false;
    this.isTriggerVisible = false;
  }

  public spawnCarousel(imagePaths: string[]) {
    this.hideTrigger();
    this.currentIndex = 0; // Reset index when spawning new carousel
    
    if(this.carouselGroup) {
      this.activeContainer.remove(this.carouselGroup);
    }

    this.carouselGroup = new THREE.Group();
    this.activeContainer.add(this.carouselGroup);
    
    const loader = new THREE.TextureLoader();
    this.images = [];

    const spacing = 1.1; 

    imagePaths.forEach((path, i) => {
      loader.load(path, (texture) => {
        // Approssimiamo un'altezza o proporzione dinamica o forzata
        const aspect = texture.image ? texture.image.width / texture.image.height : 1;
        const geo = new THREE.PlaneGeometry(1, 1 / aspect);
        const mat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geo, mat);
        
        mesh.position.x = i * spacing;
        this.carouselGroup?.add(mesh);
        this.images.push(mesh);
      });
    });
  }

  public hideCarousel() {
    if(this.carouselGroup) {
      this.carouselGroup.visible = false;
    }
  }

  private currentIndex: number = 0;

  public slideLeft() {
    if(!this.carouselGroup) return;
    this.currentIndex = Math.max(0, this.currentIndex - 1);
  }

  public slideRight() {
    if(!this.carouselGroup) return;
    // Usa la lunghezza reale delle immagini caricate
    const maxIndex = Math.max(0, this.images.length - 1);
    this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public getImagesCount(): number {
    return this.images.length;
  }

  public updateTargetTransform(detail: any) {
    const { position, rotation } = detail;
    let { scale } = detail;
    if (typeof scale !== 'number' || !Number.isFinite(scale) || scale <= 0) scale = 1;
    if (!position || !rotation) return;
    this.activeContainer.position.set(position.x, position.y, position.z);
    this.activeContainer.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
    this.activeContainer.scale.set(scale, scale, scale);
    this.activeContainer.updateMatrixWorld(true);
  }

  public update() {
    if(this.triggerMesh && this.triggerMesh.visible) {
      // Effetto rotazione
      this.triggerMesh.rotation.y += 0.02;
      this.triggerMesh.rotation.x += 0.01;
      // Effetto galleggiamento (floating)
      this.triggerMesh.position.y = 0.4 + Math.sin(performance.now() * 0.003) * 0.04;
    }

    if(this.carouselGroup) {
      const targetX = -(this.currentIndex * 1.1);
      // Lerp per scorrimento fluido
      this.carouselGroup.position.x += (targetX - this.carouselGroup.position.x) * 0.1;
    }
  }
}
