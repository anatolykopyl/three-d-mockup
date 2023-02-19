import { createSignal, onMount } from 'solid-js';
import { Mesh, MeshLambertMaterial, Object3D, Scene, TextureLoader, Vector3, WebGLRenderer } from 'three';

import style from './assets/style.css?inline'
import PhoneModel from './PhoneModel';
import screenShape from './screenShape';
import { initThreeD, recomputeUVs } from './utils';

export default function(props: {
  screen: string;
  bodyColor: string;
  distance: number;
  rotation: {
    x: number,
    y: number,
    z: number
  };
  levitate: boolean;
}) {
  const [pos, setPos] = createSignal({x: 0, y: 0});
  let container: HTMLDivElement | undefined;
  let phone: PhoneModel;

  onMount(() => {
    if (!container) {
      throw new Error('Container not mounted')
    }

    const { scene, renderer, render } = initThreeD(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    phone = new PhoneModel(new Vector3(props.rotation.x, props.rotation.y, props.rotation.z), props.bodyColor);
    scene.add(phone)

    const screenScale = 6;
    const screenWidth = screenScale * 9; 
    const screenHeight = screenScale * 19.3;
    const screenRadius = 8;

    const geometry = screenShape(screenWidth, screenHeight, screenRadius);


    const loader = new TextureLoader();
    const texture = loader.load(props.screen);

    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const screenMaterial = new MeshLambertMaterial({ map: texture });

    const screenMesh = new Mesh(geometry, screenMaterial);

    recomputeUVs(screenMesh);

    screenMesh.translateZ(3.6);
    screenMesh.geometry.center();
    phone.add(screenMesh);

    container.appendChild(renderer.domElement);

    let previousTime = 0;
    function animate(currentTime: number) {
      currentTime *= 0.001;
      const deltaTime = currentTime - previousTime;
      previousTime = currentTime;

      requestAnimationFrame(animate);
      const target = new Vector3(pos().x, -pos().y, props.distance);
      phone.animation(deltaTime, target);

      render();
    }
    animate(0);
  })

  function handleMouseMove(event: MouseEvent) {
    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    setPos({
      x: event.clientX - rect.left - rect.width / 2,
      y: event.clientY - rect.top - rect.height / 2
    });
  }

  function handleMouseEnter() {
    phone.lookingAtSomething = true;
  }

  function handleMouseLeave() {
    phone.lookingAtSomething = false;
  }

  return <>
    <style>{style}</style>
    <div
      ref={container}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      class="mockup"
      style={{
        "animation-name": props.levitate ? "levitate" : "none"
      }}
    />
  </>
}
