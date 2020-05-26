class Item {
  constructor() {
    this.radius = Settings.radius;
    this.container = new THREE.Object3D();
    var geometry = new THREE.BoxGeometry(
      0.2 * this.radius,
      0.2 * this.radius,
      0.2 * this.radius,
      0.2 * this.radius
    );
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    var box = new THREE.Mesh(geometry, material);
    this.container.add(box);
    return this.container;
  }
}
