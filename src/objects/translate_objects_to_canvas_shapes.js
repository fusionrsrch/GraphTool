import RecatangleShape from "../shapes/rectangle";
import CircleShape from "../shapes/circle";
import GridShape from "../shapes/grid";
import GridObject from "../objects/grid";
import AxisShape from "../shapes/axis";
import AxisObject from "../objects/axis";
import TickMarksShape from "../shapes/tickmarks";
import TickMarksObject from "../objects/tickmarks";

import Coordinates from "../objects/coordinates";
import Parabola from "../objects/parabola";

export default class ShapeTranslator {
  convert(object) {
    if (object === 1) {
      return new RecatangleShape(5, 5, 30, 30, "#444444");
    } else if (object === 2) {
      return new RecatangleShape(5, -5, 30, 30, "#ff550d");
    } else if (object === 3) {
      return new CircleShape(-5, -5, 10, "#800080");
    } else if (object === 4) {
      // return new CircleShape(-5, 5, 10, "#0c64e8");
      return new Parabola(new Coordinates(), new Coordinates());
    } else if (object instanceof GridObject) {
      return new GridShape();
    } else if (object instanceof AxisObject) {
      return new AxisShape();
    } else if (object instanceof TickMarksObject) {
      return new TickMarksShape();
    } else {
      console.warn("I don't know how to translate: ");
      console.warn(object);
    }
  }
}
