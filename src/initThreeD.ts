import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
import { DirectionalLight } from "three/src/lights/DirectionalLight";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial";
import { Vector3 } from "three/src/math/Vector3";
import { Mesh } from "three/src/objects/Mesh";
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { Scene } from "three/src/scenes/Scene";
import { VideoTexture } from "three/src/textures/VideoTexture";

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

  let texture;
  if (screen.endsWith(".mp4")) {
    const videoElement = document.createElement("video");
    videoElement.src = screen;
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.play();
    texture = new VideoTexture(videoElement);
  } else {
    const loader = new TextureLoader();
    texture = loader.load(screen);
  }

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