import type { BufferAttribute, Mesh } from 'three';
import { Box3, DirectionalLight, PerspectiveCamera, Scene,Vector3, WebGLRenderer } from 'three';

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

const initLight = () => {
  const light = new DirectionalLight();
  light.position.set(0, 0, 300);
  return light;
}

const initCamera = (ratio: number) => {
  const camera = new PerspectiveCamera(
    45,
    ratio
  );
  camera.position.set(0, 0, 200);
  return camera;
}

export const initThreeD = (width: number, height: number) => {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height)

  const scene = new Scene();
  const light = initLight()
  scene.add(light)
  const camera = initCamera(width/height)

  return {
    scene,
    renderer,
    render: () => renderer.render(scene, camera),
  };
}