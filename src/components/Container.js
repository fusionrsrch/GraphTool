import React, { useState } from "react";
import CanvasView from "./CanvasView";
import Grid from "../objects/grid";
import Axis from "../objects/axis";
import TickMarks from "../objects/tickmarks";

export default function Container() {
  const [stack, setStack] = useState([new Grid(), new Axis(), new TickMarks()]);

  let addParabola = function() {
    setStack(prevState => [...prevState, 1]);
  };

  let addCircle = function() {
    setStack(prevState => [...prevState, 2]);
  };

  let addSquare = function() {
    setStack(prevState => [...prevState, 3]);
  };

  let addSquare2 = function() {
    setStack(prevState => [...prevState, 4]);
  };

  let pop = function() {
    stack.splice(-1, 1);
    setStack([...stack]);
  };

  return (
    <div>
      <CanvasView stack={stack} />
      <button onClick={addParabola}>Add Parabola</button>
      <button onClick={addCircle}>Add Circle</button>
      <button onClick={addSquare}>Add Square</button>
      <button onClick={addSquare2}>Add Square2</button>
      <button onClick={pop}>Pop</button>
    </div>
  );
}
