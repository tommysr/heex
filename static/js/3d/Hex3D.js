class Hex3D {
  constructor(doorIn, doorOut, type) {
    this.radius = Settings.radius;
    this.container = new THREE.Object3D();
    this.material = Settings.material1;
    this.doorIn = doorIn;
    this.doorOut = doorOut;
    this.type = type;
    this.appendWalls();
    this.appendFloor();
    this.checkType();
  }

  getContainer(){
    return this.container;
  }

  checkType(){
    if(this.type == "light"){
      this.appendLight();
    }else if(this.type == "treasure"){
      this.appendTreasure();
    }
  }

  appendWalls() {
    let geometry = new THREE.BoxGeometry(
      1.2 * this.radius,
      0.85 * this.radius,
      0.1 * this.radius
    );
    let wall = new THREE.Mesh(geometry, this.material);

    for (let i = 0; i < 6; i++) {
      let side = null;
      if (i == this.doorOut) {
        side = new Doors3D();
      } else if (i == this.doorIn) {
        side = new Doors3D();
      } else {
        side = wall.clone();
      }

      side.position.x = Math.sin((Math.PI / 3) * i) * this.radius;
      side.position.z = Math.cos((Math.PI / 3) * i) * this.radius;
      side.position.y = (0.85 * this.radius) / 2;

      side.lookAt(new THREE.Vector3(0, (0.85 * this.radius) / 2, 0));
      this.container.add(side);
    }
  }

  appendLight() {
    this.fire = new Light();
    this.fire.position.set(0, 10, 0);
    this.container.add(this.fire);
  }

  getLight() {
    return this.fire;
  }

  appendFloor() {
    let geometry = new THREE.CylinderGeometry(
      1.2 * this.radius,
      1.2 * this.radius,
      1,
      6,
      1
    );
    let cylinder = new THREE.Mesh(geometry, this.material);

    cylinder.rotation.y = Math.PI / 6;
    cylinder.position.y = 0;

    this.container.add(cylinder);
  }

  appendTreasure() {
    this.item = new Item();
    this.item.position.set(0, 0.1 * this.radius, 0);
    this.container.add(this.item);
  }
}
