import type { BufferAttribute } from "three";
import { Box3, Mesh, MeshLambertMaterial, Object3D, Vector3 } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

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

      resolve(bodyGroup);
    });
  });
};
