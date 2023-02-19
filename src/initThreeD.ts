import { DirectionalLight, Mesh, MeshLambertMaterial, PerspectiveCamera, Scene,TextureLoader,Vector3, WebGLRenderer } from "three";

import PhoneModel from "./PhoneModel";
import screenShape from "./screenShape";
import { recomputeUVs } from "./utils";

const initLight = () => {
  const light = new DirectionalLight();
  light.position.set(0, 0, 300);
  return light;
};

const initCamera = (ratio: number) => {
  const camera = new PerspectiveCamera(
    45,
    ratio
  );
  camera.position.set(0, 0, 200);
  return camera;
};

const initPhone = async (rotation: Vector3, bodyColor: string, screen: string) => {
  const phone = await new PhoneModel(rotation, bodyColor).init();

  const screenScale = 6;
  const screenWidth = screenScale * 9; 
  const screenHeight = screenScale * 19.3;
  const screenRadius = 8;

  const geometry = screenShape(screenWidth, screenHeight, screenRadius);

  const loader = new TextureLoader();
  const texture = loader.load(screen);

  const screenMaterial = new MeshLambertMaterial({ map: texture });

  const screenMesh = new Mesh(geometry, screenMaterial);

  recomputeUVs(screenMesh);

  screenMesh.translateZ(3.6);
  screenMesh.geometry.center();
  phone.add(screenMesh);

  return phone;
};

export const initThreeD = async (width: number, height: number, rotation: Vector3, bodyColor: string, screen: string) => {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);

  const scene = new Scene();
  const light = initLight();
  scene.add(light);
  const camera = initCamera(width/height);
  const phone = await initPhone(rotation, bodyColor, screen);
  scene.add(phone);

  return {
    renderer,
    update: (dt: number, target: Vector3, idle: boolean) => {
      phone.lookingAtSomething = !idle;
      phone.animation(dt, target);
      renderer.render(scene, camera);
    }
  };
};