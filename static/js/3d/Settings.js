const Settings = {
  material1: new THREE.MeshPhongMaterial({
    color: 0x8888ff,
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load("gfx/black.jpg"),
    wireframe: false,
    transparent: true,
    opacity: 1,
  }),
  radius: 100
};

