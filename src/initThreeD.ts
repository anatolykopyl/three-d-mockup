import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
import { SRGBColorSpace } from "three/src/constants";
import { DirectionalLight } from "three/src/lights/DirectionalLight";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial";
import { Vector3 } from "three/src/math/Vector3";
import { Mesh } from "three/src/objects/Mesh";
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { Scene } from "three/src/scenes/Scene";
import { Texture } from "three/src/textures/Texture";
import { VideoTexture } from "three/src/textures/VideoTexture";

import PhoneModel from "./PhoneModel";
import screenShape from "./screenShape";
import { recomputeUVs } from "./utils";

const initLight = () => {
  const light = new DirectionalLight();
  light.color.set(3, 3, 3);
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

interface TScreenIniter {
  init: () => Texture
}

class VideoScreenIniter implements TScreenIniter {
  screen: string;

  constructor (screen: string) {
    this.screen = screen;
  }

  init() {
    const videoElement = document.createElement("video");
    videoElement.src = this.screen;
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.play();
    const texture = new VideoTexture(videoElement);
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }
}

class ImageScreenIniter implements TScreenIniter {
  screen: string;

  constructor (screen: string) {
    this.screen = screen;
  }

  init() {
    const loader = new TextureLoader();
    const texture = loader.load(this.screen);
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }
}

const initPhone = async (rotation: Vector3, bodyColor: string, screenIniter: TScreenIniter) => {
  const phone = new PhoneModel(rotation, bodyColor);
  await phone.init();

  const screenScale = 6;
  const screenWidth = screenScale * 9; 
  const screenHeight = screenScale * 19.3;
  const screenRadius = 8;

  const geometry = screenShape(screenWidth, screenHeight, screenRadius);

  const texture = screenIniter.init();

  const screenMaterial = new MeshLambertMaterial({ map: texture });
  const screenMesh = new Mesh(geometry, screenMaterial);

  recomputeUVs(screenMesh);

  screenMesh.translateZ(3.6);
  screenMesh.geometry.center();
  
  phone.add(screenMesh);

  return phone;
};

export const initThreeD = async (width: number, height: number, rotation: Vector3, bodyColor: string, screen: string) => {
  // TODO: Gamma correction instead of light color
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);

  const scene = new Scene();
  const light = initLight();
  scene.add(light);
  const camera = initCamera(width/height);

  const screenIniter = screen.endsWith(".mp4") ? new VideoScreenIniter(screen) : new ImageScreenIniter(screen);

  const phone = await initPhone(rotation, bodyColor, screenIniter);
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