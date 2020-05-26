$(document).ready(function () {
  const HEIGHT = window.innerHeight;
  const WIDTH = window.innerWidth;

  var raycaster = new THREE.Raycaster();
  var mouseVector = new THREE.Vector2();

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    45, // kąt patrzenia kamery (FOV - field of view)
    WIDTH / HEIGHT, // proporcje widoku, powinny odpowiadać proporcjom naszego ekranu przeglądarki
    0.1, // minimalna renderowana odległość
    10000 // maksymalna renderowana odległość od kamery
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

  var level = new Level3D(scene);
  var ui = new Ui(level.getLights());

  $("#height").val(0);

  $("#intensity").on("input", () => {
    ui.changeIntensity($("#intensity").val());
  });

  $("#height").on("input", () => {
    ui.changePos($("#height").val() * 2);
  });

  var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControl.addEventListener("change", function () {
    renderer.render(scene, camera);
  });


  $("#root").append(renderer.domElement);

  function render() {
    orbitControl.update();
    requestAnimationFrame(render);


    renderer.render(scene, camera);
  }

  render();
});
