import Shape from "./shape";

export default class Circle extends Shape {
  r = 0;
  x = 0;
  y = 0;
  constructor(x, y, r, fillColor) {
    super(fillColor);
    this.r = r;
    this.x = x;
    this.y = y;
  }
}
