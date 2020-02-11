import React, { useState, useRef, useEffect } from "react";
import ShapeTranslator from "../objects/translate_objects_to_canvas_shapes";
import Canvas from "../painter/canvas";
import Painter from "../painter/painter";
import ViewPort from "../objects/viewport";

export default function CanvasView({ stack }) {
  const initialValue = [];
  const [shapes, setShapes] = useState(initialValue);
  const canvasEl = useRef(null);

  // const viewport = new ViewPort(18, -2, -2, 18);
  const viewport = new ViewPort(10, -10, -10, 10);

  //###################################################################################################

  useEffect(() => {
    const translator = new ShapeTranslator();
    let array = [];

    for (const element of stack) {
      let shape = translator.convert(element);
      array.push(shape);
    }

    setShapes([...array]);
  }, [stack]);

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    const canvas = new Canvas(ctx, viewport);
    console.log(canvas);
    const painter = new Painter(canvas);

    painter.clear();
    painter.draw(shapes);
  }, [shapes, viewport]);

  //###################################################################################################

  // drag related variables
  var dragok = false;
  var startX;
  var startY;

  //###################################################################################################

  let handleMouseDown = function(event) {
    // tell the browser we're handling this mouse event
    event.preventDefault();
    event.stopPropagation();

    const BB = canvasEl.current.getBoundingClientRect();
    const offsetX = BB.left;
    const offsetY = BB.top;

    // get the current mouse position
    const mx = parseInt(event.clientX - offsetX);
    const my = parseInt(event.clientY - offsetY);

    // test each shape to see if the mouse pointer is inside the shape boundaries
    dragok = false;
    for (const shape of shapes) {
      // decide if the shape is a rect or circle
      //TODO: use shape object type
      if (shape.width) {
        if (
          mx > shape.X &&
          mx < shape.X + shape.width &&
          my > shape.Y &&
          my < shape.Y + shape.height
        ) {
          // if yes, set that rects isDragging=true
          dragok = true;
          shape.isDragging = true;
        }
      } else {
        const dx = shape.X - mx;
        const dy = shape.Y - my;
        // test if mouse is inside this circle
        if (dx * dx + dy * dy < shape.r * shape.r) {
          dragok = true;
          shape.isDragging = true;
        }
      }
    }

    // save the current mouse position
    startX = mx;
    startY = my;
  };

  let handleMouseUp = function(event) {
    // tell the browser we're handling this mouse event
    event.preventDefault();
    event.stopPropagation();

    // clear all the dragging flags
    dragok = false;
    for (const shape of shapes) {
      shape.isDragging = false;
    }
  };

  let handleMouseMove = function(event) {
    // if we're dragging anything...
    if (dragok) {
      // tell the browser we're handling this mouse event
      event.preventDefault();
      event.stopPropagation();

      const BB = canvasEl.current.getBoundingClientRect();
      const offsetX = BB.left;
      const offsetY = BB.top;

      // get the current mouse position
      const mx = parseInt(event.clientX - offsetX);
      const my = parseInt(event.clientY - offsetY);

      // calculate the distance the mouse has moved since the last mousemove
      const dx = mx - startX;
      const dy = my - startY;

      const ctx = canvasEl.current.getContext("2d");
      const painter = new Painter(new Canvas(ctx, viewport));

      // move each react that isDragging by the distance the mouse has moved since the last mousemove
      for (const shape of shapes) {
        if (shape.isDragging) {
          shape.X += dx;
          shape.Y += dy;
          const a = painter.canvas.logicalX(shape.X + dx);
          const b = painter.canvas.logicalY(shape.Y + dy);
          console.log(a, b);
        }
      }

      // redraw the scene with the new rect positions
      painter.clear();
      painter.draw(shapes);

      // reset the starting mouse position for the next mousemoove
      startX = mx;
      startY = my;
    }
  };

  //###################################################################################################

  let divStyle = { border: "1px solid black" };

  return (
    <div>
      <canvas
        ref={canvasEl}
        width="422"
        height="422"
        style={divStyle}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></canvas>
    </div>
  );
}
