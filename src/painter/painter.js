import Circle from "../shapes/circle";
import Rectangle from "../shapes/rectangle";
import Grid from "../shapes/grid";
import Axis from "../shapes/axis";
import TickMarks from "../shapes/tickmarks";
import Parabola from "../objects/parabola";

export default class Painter {
  canvas;
  constructor(canvas) {
    this.canvas = canvas;
  }

  clear() {
    this.canvas.clear();
  }

  draw(shapes) {
    for (const shape of shapes) {
      this._paint(shape);
    }
  }

  _paint(shape) {
    console.log("paint");
    console.log(shape);

    const ctx = this.canvas.ctx;

    if (shape.X === undefined) {
      shape.X = this.canvas.internalX(shape.x);
    }

    if (shape.Y === undefined) {
      shape.Y = this.canvas.internalY(shape.y);
    }

    if (shape instanceof Rectangle) {
      ctx.fillStyle = shape.fillColor;
      ctx.fillRect(shape.X, shape.Y, shape.width, shape.height);
    } else if (shape instanceof Circle) {
      ctx.fillStyle = shape.fillColor;
      ctx.beginPath();
      ctx.arc(shape.X, shape.Y, shape.r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    } else if (shape instanceof Grid) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(197, 237, 240, .4)";
      const a = 2;
      const b = 19;
      const c = ctx.canvas.width;
      const d = ctx.canvas.height;
      const e = 22;
      const f = 22;
      // horizontal lines
      for (let i = 0; i <= e; i++) {
        ctx.beginPath();
        ctx.moveTo(0, a + b * i);
        ctx.lineTo(c, a + b * i);
        ctx.stroke();
      }
      // vertical lines
      for (let i = 0; i <= f; i++) {
        ctx.beginPath();
        ctx.moveTo(a + b * i, 0);
        ctx.lineTo(a + b * i, d);
        ctx.stroke();
      }
    } else if (shape instanceof Axis) {
      const a = 2;
      const b = 19;
      const c = ctx.canvas.width;
      const d = ctx.canvas.height;
      const e = 22;
      const f = 22;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      // x-axis
      ctx.beginPath();
      ctx.moveTo(0, a + (b * e) / 2);
      ctx.lineTo(c, a + (b * e) / 2);
      ctx.stroke();
      // y-axis
      ctx.beginPath();
      ctx.moveTo(a + (b * f) / 2, 0);
      ctx.lineTo(a + (b * f) / 2, d);
      ctx.stroke();

      const adjacent = 7;
      const angle = 33;
      const opposite = Math.tan((angle * Math.PI) / 180) * adjacent;

      // top arrow
      ctx.beginPath();
      ctx.moveTo(a + (b * f) / 2, 0);
      ctx.lineTo(a + (b * f) / 2 - opposite, 0 + adjacent);
      ctx.lineTo(a + (b * f) / 2 + opposite, 0 + adjacent);
      ctx.fill();
      // bottom arrow
      ctx.beginPath();
      ctx.moveTo(a + (b * f) / 2, d);
      ctx.lineTo(a + (b * f) / 2 - opposite, d - adjacent);
      ctx.lineTo(a + (b * f) / 2 + opposite, d - adjacent);
      ctx.fill();
      // right arrow
      ctx.beginPath();
      ctx.moveTo(c, a + (b * e) / 2);
      ctx.lineTo(c - adjacent, a + (b * e) / 2 - opposite);
      ctx.lineTo(c - adjacent, a + (b * e) / 2 + opposite);
      ctx.fill();
      // left arrow
      ctx.beginPath();
      ctx.moveTo(0, a + (b * e) / 2);
      ctx.lineTo(0 + adjacent, a + (b * e) / 2 - opposite);
      ctx.lineTo(0 + adjacent, a + (b * e) / 2 + opposite);
      ctx.fill();
    } else if (shape instanceof TickMarks) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      const a = 2;
      const b = 19;
      const e = 22;
      const f = 22;
      const g = 7;
      const h = 12;
      const l = 3;
      const k = 4;
      const m = 7;

      // x-axis tickmarks
      for (let i = 1; i < e; i++) {
        ctx.beginPath();
        ctx.moveTo(a + b * i, a + (b * e) / 2);
        ctx.lineTo(a + b * i, a + (b * e) / 2 - g);
        ctx.stroke();

        let num = i - 10 - 1;
        let multiplier = 1;

        if (num >= 10) {
          multiplier = 2;
        } else if (num > 0) {
          multiplier = 1;
        } else if (num <= -10) {
          multiplier = 3.3;
        } else if (num < 0) {
          multiplier = 2.3;
        }

        ctx.font = "12px sans-serif";
        if (num !== 0) {
          ctx.fillText(num, a + b * i - l * multiplier, a + (b * e) / 2 + h);
        }
      }

      // y-axis tickmarks
      for (let i = 1; i < f; i++) {
        ctx.beginPath();
        ctx.moveTo(a + (b * f) / 2, a + b * i);
        ctx.lineTo(a + (b * f) / 2 + g, a + b * i);
        ctx.stroke();

        let num = (i - 10 - 1) * -1;
        let multiplier = 1;

        if (num >= 10) {
          multiplier = 2.3;
        } else if (num > 0) {
          multiplier = 1.3;
        } else if (num <= -10) {
          multiplier = 2.9;
        } else if (num < 0) {
          multiplier = 1.9;
        }

        ctx.font = "12px sans-serif";
        if (num !== 0) {
          ctx.fillText(num, a + (b * f) / 2 - m * multiplier, a + b * i + k);
        }
      }
    } else if (shape instanceof Parabola) {
      // ctx.restore();
      // context.lineJoin = 'round';
      // context.lineWidth = thickness;
      // context.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(100, 100);
      ctx.stroke();
      // context.restore();

      // Graph.prototype.transformContext = function() {
      //   var context = this.context;

      //   // move context to center of canvas
      //   this.context.transl
    } else {
      console.warn("I don't know how to paint: ");
      console.warn(shape);
    }
  }
}
