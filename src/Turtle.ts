import P5 from "p5";
let pp5: P5;
export class Turtle {
  static p5: P5;
  x = 0;
  y = 0;
  angle = -Math.PI / 2;
  size = 3;
  color: P5.Color;
  dl = 10;
  constructor() {
    pp5 = Turtle.p5;
    this.color = pp5.color(0x11, 0x11, 0x11);
  }
  setHeading(heading) {
    // console.log({ heading });
    this.angle = heading;
  }
  right(angle) {
    this.angle += (angle / 180) * pp5.TWO_PI;
  }
  left(angle) {
    this.angle -= (angle / 180) * pp5.TWO_PI;
  }
  forward(len, mul) {
    let x1 = this.x;
    let y1 = this.y;
    this.x += len * pp5.cos(this.angle); //((this.angle * pp5.PI) / 180 - pp5.TWO_PI);
    this.y += len * pp5.sin(this.angle); //((this.angle * pp5.PI) / 180 - pp5.TWO_PI);
    if (pp5.frameCount % 10000 === 0) console.log(this.color.toString());
    if (this.color.toString() === "rgba(17,17,17,1)") {
      pp5.strokeWeight(this.size * mul);
      pp5.line(x1, y1, this.x, this.y);
    } else {
      pp5.push();
      pp5.fill(this.color);

      pp5.stroke(this.color);
      pp5.translate(x1, y1);
      pp5.rotate(this.angle);
      pp5.ellipse(0, 0, len * 2, mul * mul);
      pp5.noStroke();
      let lightsColor = this.color;
      lightsColor.setAlpha(2);
      pp5.fill(lightsColor);
      pp5.ellipse(0, 0, (mul ** 3 * 7) / 2, (mul ** 3 * 7) / 6);
      lightsColor.setAlpha(1);
      pp5.fill(lightsColor);
      pp5.ellipse(0, 0, len * 2 + 20, mul * mul + 20);

      pp5.pop();
    }
    // console.log({
    //   len,
    //   s: this.size,
    //   cos: pp5.cos(this.angle),
    //   angle: this.angle,
    //   x: this.x,
    //   y: this.y
    // });

    // p5.rect(30, 20, 55, 55);

    //this.x=x1;this.y=y1;
  }

  pensize(size?: number) {
    // console.log({ size });
    if (!size) return this.size;
    this.size = size;
  }
  pencolor(color: P5.Color) {
    if (!color) return this.color.toString();
    if (this.color !== color) pp5.stroke(color);
    this.color = color;
  }
}
