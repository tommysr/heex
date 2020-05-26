$(document).ready(function () {
  const HEIGHT = window.innerHeight;
  const WIDTH = window.innerWidth;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    45, 
    WIDTH / HEIGHT,
    0.1, 
    10000 
  );

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xffffff);
  renderer.setSize(WIDTH, HEIGHT);
  
  camera.position.set(100, 100, 100);
  camera.lookAt(scene.position);

  var axes = new THREE.AxesHelper(1000);
  scene.add(axes);

  var geometry = new THREE.PlaneGeometry(8000, 8000, 128, 128);
  var material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
    wireframe: true,
  });

  var plane = new THREE.Mesh(geometry, material);
  plane.rotateX(Math.PI / 2);
  scene.add(plane);

  var hex = new Hex3D(0, 1, "light");
  scene.add(hex.getContainer());

  var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControl.addEventListener("change", function () {
    renderer.render(scene, camera);
  });

  $("#root").append(renderer.domElement);

  function render() {
    requestAnimationFrame(render);
    orbitControl.update();
    renderer.render(scene, camera);
  }

  render();
});
