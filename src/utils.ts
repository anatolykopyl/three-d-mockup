import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import type { BufferAttribute } from "three/src/core/BufferAttribute";
import { Object3D } from "three/src/core/Object3D";
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial";
import { Box3 } from "three/src/math/Box3";
import { Vector3 } from "three/src/math/Vector3";
import { Mesh } from "three/src/objects/Mesh";

const objLoader = new OBJLoader();

export const recomputeUVs = (mesh: Mesh) => {
  const box = new Box3().setFromObject(mesh);
  const size = new Vector3();
  box.getSize(size);
  const vec3 = new Vector3();
  const attPos = mesh.geometry.attributes.position as BufferAttribute;
  const attUv = mesh.geometry.attributes.uv as BufferAttribute;
  for (let i = 0; i < attPos.count; i += 1) {
    vec3.fromBufferAttribute(attPos, i);
    attUv.setXY(
      i,
      (vec3.x - box.min.x) / size.x,
      (vec3.y - box.min.y) / size.y
    );
  }
};

export const loadObj = (obj: string, color: string): Promise<Object3D> => {
  return new Promise((resolve) => {
    objLoader.load(obj, (body) => {
      const bodyGroup = new Object3D();
      body.traverse((child) => {
        const childAsMesh = child as Mesh;
        if (!childAsMesh.material || !childAsMesh.geometry) {
          return;
        }
        childAsMesh.material = new MeshLambertMaterial({ color });
        childAsMesh.geometry.center();
        const mesh = new Mesh(childAsMesh.geometry, childAsMesh.material);
        const scale = 8.6;
        mesh.rotateX(Math.PI / 2);
        mesh.scale.set(-scale, scale, scale);
        bodyGroup.add(mesh);
      });

      resolve(bodyGroup);
    });
  });
};
