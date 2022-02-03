import P5 from "p5";
import { Turtle } from "./Turtle";

export function drawIt(p5: P5, pdl = 9, axiom = "2220") {
  let startDl = pdl;
  let maxDl = 11;
  Turtle.p5 = p5;

  let axmTemp = "";
  let itr = 11;
  let dl = pdl;

  let stc = [];
  let turtle: Turtle = new Turtle();

  const randint = p5.random;

  let translate = { "1": "21", "0": "1[-20]+20" };
  // console.log(Array.from(axiom));

  const t = Array.from(Array(itr).keys());
  if (axiom === "220")
    for (let k in t) {
      // console.log({ k });
      for (let ch of Array.from(axiom)) {
        // console.log({ ch, trch: translate[ch] });
        if (translate[ch]) axmTemp += translate[ch];
        else axmTemp += ch;
      }
      axiom = axmTemp;
      axmTemp = "";
    }
  //console.log({ axiom });
  let mul = p5.map(startDl, 0, maxDl, 0, 6);
  for (let ch of Array.from(axiom)) {
    //console.log(ch);
    if (ch === "+") turtle.right(randint(-16, 16));
    else if (ch === "-") turtle.left(randint(-16, 16));
    else if (ch === "2") {
      if (randint(0, 10) > 4) {
        turtle.forward(dl, mul);
      }
    } else if (ch === "1") {
      if (randint(0, 10) > 4) {
        turtle.forward(dl, mul);
      }
    } else if (ch === "0") {
      stc.push(turtle.pensize());

      turtle.pensize(0.18 * mul + dl > 8 ? mul * p5.map(dl, 8, 12, 0, 0.7) : 0);
      let r = randint(0, 10);
      if (r < 3) turtle.pencolor("#009900AA");
      else if (r > 6) turtle.pencolor("#667900AA");
      else turtle.pencolor("#20BB00");
      turtle.forward(dl - p5.map(startDl, 0, maxDl, 2, 8), mul);
      turtle.pensize(stc.pop());
      turtle.pencolor("#111");
    } else if (ch === "[") {
      turtle.pensize(turtle.pensize() * 0.7);
      stc.push(turtle.pensize());
      stc.push(turtle.x);
      stc.push(turtle.y);
      stc.push(turtle.angle);
    } else if (ch === "]") {
      //turtle.penup();
      turtle.setHeading(stc.pop());
      turtle.y = stc.pop();
      turtle.x = stc.pop();

      turtle.pensize(stc.pop());
      // turtle.pendown();
    }
  }
  // turtle.update();
  // turtle.mainloop();
  return axiom;
}
