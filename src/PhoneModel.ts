import { Group, Object3D, Vector3 } from "three";

import { loadObj } from "./utils";

const phoneObj = new URL("./assets/iphone.obj", import.meta.url).href;

export default class MockupModel extends Group {
  home: Vector3;
  lookingAtSomething: boolean;
  color: string;

  constructor(rotation: Vector3, color: string) {
    super();

    this.home = rotation;
    this.lookAt(rotation);
    this.lookingAtSomething = false;
    this.color = color;
    this.position.setY(5);
  }

  async init() {
    this.add(await loadObj(phoneObj, this.color));
    
    return this;
  }

  animation(dt: number, vectorTarget: Vector3) {
    const mock = new Object3D();
    mock.lookAt(this.lookingAtSomething ? vectorTarget : this.home);

    this.quaternion.slerp(mock.quaternion, 10 * dt);
  }
}
