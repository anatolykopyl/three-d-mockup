import { Group, Mesh,MeshLambertMaterial,Object3D, Vector3 } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { Object3D } from 'three/src/core/Object3D';
// import { Vector3 } from 'three/src/math/Vector3';
// import { Group } from 'three/src/objects/Group';

const phoneObj = new URL('./assets/iphone.obj', import.meta.url).href;


export default class MockupModel extends Group {
  home: Vector3;
  lookingAtSomething: boolean;

  constructor(rotation: Vector3, color: string) {
    super();

    this.home = rotation;
    this.lookingAtSomething = false;

    const objLoader = new OBJLoader();
    objLoader.load(phoneObj, (body) => {
      const bodyGroup = new Object3D();
      body.traverse((child) => {
        if (child instanceof Mesh) {
          child.material = new MeshLambertMaterial({ color });
          child.geometry.center();
          const mesh = new Mesh(child.geometry, child.material);
          const scale = 8.6;
          mesh.rotateX(Math.PI / 2);
          mesh.scale.set(-scale, scale, scale);
          bodyGroup.add(mesh);
        }
      });

      this.add(bodyGroup);
    });
  }

  animation(dt: number, vectorTarget: Vector3) {
    const mock = new Object3D()
    mock.lookAt(this.lookingAtSomething ? vectorTarget : this.home)

    this.quaternion.slerp(mock.quaternion, 10 * dt);
  }
}
