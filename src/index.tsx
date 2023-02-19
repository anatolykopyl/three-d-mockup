import { customElement } from "solid-element";

import Mockup from "./Mockup";

customElement(
  "three-d-mockup", 
  { 
    screen: null,
    bodyColor: "white",
    distance: 500,
    rotation: {x: 250, y: 170, z: 500},
    levitate: true
  },
  (props) => {
    if (!props.screen) throw new Error("The screen prop is required");

    return <Mockup
      screen={props.screen}
      bodyColor={props.bodyColor}
      distance={props.distance}
      rotation={props.rotation}
      levitate={props.levitate}
    />;
  }
);
