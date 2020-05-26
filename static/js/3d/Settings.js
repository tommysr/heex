const Settings = {
  wallMaterial: new THREE.MeshPhongMaterial({
    color: 0x8888ff,
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load("gfx/black.jpg"),
    wireframe: false,
    transparent: true,
    opacity: 1,
  }),
  radius: 100,
  cylinderGeometry: new THREE.CylinderGeometry(5, 5, 20, 32)
};

Settings.wallGeometry = new THREE.BoxGeometry(
  1.2 * Settings.radius,
  0.85 * Settings.radius,
  0.1 * Settings.radius
);