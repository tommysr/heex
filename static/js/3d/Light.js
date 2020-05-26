class Light {
  constructor() {
    this.container = new THREE.Object3D();
    var geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 , wireframe: true});
    var cylinder = new THREE.Mesh(geometry, material);
    var pointLight = new THREE.PointLight(0xff6600,5);
    this.container.add(cylinder)
    this.container.add(pointLight);
    return this.container;
  }
}
