import Coordinates from "../objects/coordinates";

// Canvas
// X and Y represent the logical x and y coordinates

export default class Canvas {
  ctx;
  viewport;
  // properties
  // coordinates of the physical center
  origin = new Coordinates(0, 0);
  // min/max for logical X
  maxX = 0;
  minX = 0;
  // min/max for logical Y
  maxY = 0;
  minY = 0;
  // range of logoical X
  rangeX = 0;
  // range of logoical Y
  rangeY = 0;
  //TODO: what is scale?
  scaleX = 0;
  scaleY = 0;
  // pixels per logical unit
  unitX = 0;
  unitY = 0;
  height = 0;
  width = 0;
  constructor(ctx, viewport) {
    this.ctx = ctx;
    this.viewport = viewport;
    this._init();
  }

  _init() {
    this.height = this.ctx.canvas.height;
    this.width = this.ctx.canvas.width;

    this.maxX = this.viewport.right;
    this.minX = this.viewport.left;
    this.maxY = this.viewport.top;
    this.minY = this.viewport.bottom;

    this.rangeX = this.maxX - this.minX;
    this.rangeY = this.maxY - this.minY;

    this.center = new Coordinates(
      Math.round(0.5 * this.width),
      Math.round(0.5 * this.height)
    );

    this.scaleX = this.width / this.rangeX;
    this.scaleY = this.height / this.rangeY;
    this.unitX = this.width / this.rangeX;
    this.unitY = this.height / this.rangeY;

    this.origin = new Coordinates(this.internalX(0), this.internalY(0));
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  //#################################################################################################

  // // returns the right boundary of the logical viewport
  // maxX() {
  //   return this.maxxX;
  // }

  // // returns the left boundary of the logical viewport
  // minX() {
  //   return this.minX;
  // }

  // // returns the top boundary of the logical viewport
  // maxY() {
  //   return this.maxY;
  // }

  // // returns the bottom boundary of the logical viewport
  // minY() {
  //   return this.minY;
  // }

  // //################################################################################################

  // // // returns the physical x-coordinate of a logical x-coordinate
  // // physicalX(x) {
  // //   return (
  // //     ((x - this.minX()) / (this.maxX() - this.minX())) * this.ctx.canvas.width
  // //   );
  // // }

  // // // returns the physical y-coordinate of a logical y-coordinate
  // // physicalY(y) {
  // //   return (
  // //     this.ctx.canvas.height -
  // //     ((y - this.minY()) / (this.maxY() - this.minY())) * this.ctx.canvas.height
  // //   );
  // // }

  // // logicalX(X) {
  // //   return 1;
  // // }

  // // logicalY(Y) {
  // //   return 1;
  // // }

  // // returns the physical x-coordinate of a logical x-coordinate
  // logicalx(X) {
  //   return X / this.unitX;
  // }

  // // returns the physical y-coordinate of a logical y-coordinate
  // logicaly(Y) {
  //   return Y / this.unitY;
  // }

  // // returns the physical x-coordinate of a logical x-coordinate
  // physicalX(x) {
  //   return x * this.unitX;
  // }

  // // returns the physical y-coordinate of a logical y-coordinate
  // physicalY(y) {
  //   return y * this.unitY;
  // }

  internalX(x) {
    // % of the width
    //211 =  (0 + z) * 422/20
    //62  =  (0 + z) * 422/20
    // return (1 / this.rangeX) * this.width;
    // return
    return Math.round((Math.abs(this.minX) + x) * this.unitX);
  }

  internalY(y) {
    // // % of the width
    // return (1 / this.rangeY) * this.height;
    return Math.round((this.maxY - y) * this.unitY);
  }
}
