class Level3D {
  constructor(scene) {
    this.scene = scene;
    this.data;
    this.hexy = new Array();
    this.lights = new Array();
    this.level;
    this.getData();
  }

  getData() {
    let name = window.prompt("enter name");
    $.ajax({
      url: "/get",
      data: {name:name},
      type: "POST",
      success: (data) => {
        this.data = data;
        this.makeLevel(data);
      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    });
  }

  getLights() {
    return this.lights;
  }

  makeLevel(data) {
    console.log(data)
    this.level = new THREE.Object3D();
    let radius = Settings.radius;

    for (let i = 0; i < data.hexes.length; i++) {
      let hex_new = new Hex3D(
        data.hexes[i].dirIn,
        data.hexes[i].dirOut,
        data.hexes[i].type
      );

      let hex = hex_new.getContainer();

      hex.position.x = (data.hexes[i].x * radius * 344) / 200;
      if (data.hexes[i].x % 2 == 0) {
        hex.position.z = -((data.hexes[i].z * 400 * radius) / 200);
      } else {
        hex.position.z = -((data.hexes[i].z * 400 * radius) / 200 + radius);
      }

      if(hex_new.getLight()!=undefined)
      this.lights.push(hex_new.getLight());
      this.level.add(hex);
    }

    var start = {
      x: (this.data.hexes[0].x * radius * 344) / 200,
      y: -((this.data.hexes[0].z * 400 * radius) / 200),
    };

    this.level.position.set(-start.x, 0, -start.y);
    this.scene.add(this.level);
  }
}
