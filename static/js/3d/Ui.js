class Ui {
  constructor(lights) {
    this.lights = lights;
  }

  changeIntensity(val) {
    for (let el of this.lights) el.children[1].intensity = val/10;
  }

  changePos(val) {
    for (let el of this.lights) el.position.y = val;
  }
}
