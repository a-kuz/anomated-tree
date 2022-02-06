import P5 from "p5";
let pp5: P5;
export class Turtle {
  static p5: P5;
  x = 0;
  y = 0;
  angle = -Turtle.p5.HALF_PI;
  size = 5;
  color = "#111";
  dl = 4;
  constructor() {
    pp5 = Turtle.p5;
  }
  setHeading(heading) {
    // console.log({ heading });
    this.angle = heading;
  }
  right(angle) {
    this.angle += (angle / 180) * Turtle.p5.TWO_PI;
  }
  left(angle) {
    this.angle -= (angle / 180) * Turtle.p5.TWO_PI;
  }
  forward(len, mul) {
    let x1 = this.x;
    let y1 = this.y;
    this.x += len * Turtle.p5.cos(this.angle); //((this.angle * Turtle.p5.PI) / 180 - Turtle.p5.TWO_PI);
    this.y += len * Turtle.p5.sin(this.angle); //((this.angle * Turtle.p5.PI) / 180 - Turtle.p5.TWO_PI);
    // if (
    //   this.size * this.size * mul + len > 8 ||
    //   (this.color !== "#111" && this.size > 0.5)
    // ) {
    Turtle.p5.strokeWeight((this.size * mul) / 1.6);

    // console.log({
    //   len,
    //   s: this.size,
    //   cos: Turtle.p5.cos(this.angle),
    //   angle: this.angle,
    //   x: this.x,
    //   y: this.y
    // });

    // p5.rect(30, 20, 55, 55);
    Turtle.p5.line(x1, y1, this.x, this.y);
    // }
    //this.x=x1;this.y=y1;
  }

  pensize(size?: number) {
    // console.log({ size });
    if (!size) return this.size;
    this.size = size;
  }
  pencolor(color = "") {
    if (!color) return this.color.toString();
    if (this.color !== color) Turtle.p5.stroke(color);
    this.color = color;
  }
}
