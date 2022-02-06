import P5 from "p5";

import { Turtle } from "./Turtle";
let totalTime = 0;
export function drawIt(p5: P5, pdl = 9, axiom) {
  let startDl = pdl;
  let maxDl = 12;
  Turtle.p5 = p5;
  let dl = pdl;

  let stc = [];
  let turtle: Turtle = new Turtle();

  const randint = p5.random;

  // console.log({ axiom });
  let mul = p5.map(startDl, 0, maxDl, 0, 6);
  let lastDtime = 0;
  let maxDelta = 0;

  totalTime += p5.deltaTime / 2;
  totalTime = totalTime % Number.MAX_SAFE_INTEGER;
  const divider = 2450;
  const iMod = totalTime % divider;
  const iDivMod2 = p5.floor(totalTime / divider) % 2;
  let dTime = -1 * iDivMod2 * iMod + divider * iDivMod2 + (1 - iDivMod2) * iMod;
  if (iDivMod2) dTime = Math.cos((dTime / divider) * p5.TWO_PI);
  else dTime = Math.cos((dTime / divider) * p5.TWO_PI);
  const delta = p5.abs(dTime - lastDtime);
  maxDelta = maxDelta > delta ? maxDelta : delta;
  lastDtime = dTime;
  let mlt = p5.map(startDl, 0, maxDl, 4, 10);
  let mlt2 = p5.map(dl, 8, 12, 0, 0.7);
  for (let ch of Array.from(axiom)) {
    //const dTime2 = -1*iDivMod2*iMod+100*iDivMod2+(1−iDivMod2)*iMod;

    if (ch === "+") turtle.right(randint(0, 13) + dTime * p5.random(0, 2));
    else if (ch === "-") turtle.left(randint(0, 13) + dTime * p5.random(0, 2));
    else if (ch === "2") {
      if (randint(0, 10) > 4) {
        turtle.forward(dl, mul);
      }
    } else if (ch === "1") {
      if (randint(0, 10) > 7) {
        turtle.forward(dl, mul);
      }
    } else if (ch === "0") {
      stc.push(turtle.pensize());

      turtle.pensize(0.18 * mul + dl > 8 ? mul * mlt2 : 0);
      let r = randint(0, 10);
      if (r < 3) turtle.pencolor("#009900");
      else if (r > 6) turtle.pencolor("#667900");
      else turtle.pencolor("#20BBAA");
      turtle.forward(dl - mlt, mul);
      turtle.pensize(stc.pop());
      turtle.pencolor("#111");
    } else if (ch === "[") {
      turtle.pensize(turtle.pensize() * 0.72);
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
  if (Math.random() > 0.99) console.log(maxDelta);

  // turtle.update();
  // turtle.mainloop();
  return axiom;
}
