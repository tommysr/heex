class Doors3D {
  constructor() {
    this.container = new THREE.Object3D();
    this.radius = Settings.radius;
    this.material = Settings.wallMaterial;
    let geometry = new THREE.BoxGeometry(
      0.3 * this.radius,
      0.85 * this.radius,
      0.1 *this.radius
    );

    let wall1 = new THREE.Mesh(geometry, this.material);
    wall1.position.x = 0.45 * this.radius;
    this.container.add(wall1);

    let wall2 = new THREE.Mesh(geometry, this.material);
    wall2.position.x = -0.45 * this.radius;
    this.container.add(wall2);
    return this.container;
  }
}
