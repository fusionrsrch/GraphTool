import Shape from "./shape";

export default class Rectangle extends Shape {
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  constructor(x, y, width, height, fillColor) {
    super(fillColor);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
