import { createSignal, onMount } from "solid-js";
import { Vector3, WebGLRenderer } from "three";

import style from "./assets/style.css?inline";
import { initThreeD } from "./initThreeD";

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
  const [mousePos, setMousePos] = createSignal(new Vector3(0, 0, props.distance));
  const [idle, setIdle] = createSignal(true);

  let container: HTMLDivElement | undefined;
  let update: (dt: number, target: Vector3, idle: boolean) => void;
  let renderer: WebGLRenderer;

  onMount(async () => {
    container = container as HTMLDivElement;

    const phoneRotationVector = new Vector3(props.rotation.x, props.rotation.y, props.rotation.z);
    ({ renderer, update } = await initThreeD(container.clientWidth, container.clientHeight, phoneRotationVector, props.bodyColor, props.screen));
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);
  });

  let previousTime = 0;
  function animate(currentTime: number) {
    currentTime *= 0.001;
    const deltaTime = currentTime - previousTime;
    previousTime = currentTime;

    requestAnimationFrame(animate);
    update?.(deltaTime, mousePos(), idle());
  }
  animate(0);

  function handleMouseMove(event: MouseEvent) {
    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    setMousePos(new Vector3(
      event.clientX - rect.left - rect.width / 2,
      - (event.clientY - rect.top - rect.height / 2),
      props.distance
    ));
  }

  function handleMouseEnter() {
    setIdle(false);
  }

  function handleMouseLeave() {
    setIdle(true);
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
  </>;
}
