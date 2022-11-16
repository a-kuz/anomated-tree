/// <reference path="../node_modules/@types/p5/global.d.ts" />
import P5 from "p5";
// import "p5/lib/addons/p5.dom";
// import "p5/lib/addons/p5.sound";	// Include if needed
import "./styles.scss";
import { drawIt } from "./drawing";
import { AXIOM11, maxDl } from "./consts";
const itr = 10;
const dx = 0.02;
let axiom;

let haveLive = 1;

if (itr === 16) axiom = AXIOM11;

if (!axiom) {
  axiom = "2220";
  let axmTemp;
  let translate = { "1": "21", "0": "11[-20]+20" };
  // const t = Array.from(Array(itr).keys());

  for (let i = 0; i < itr; i += 1) {
    for (let ch: string of Array.from(axiom)) {
      if (translate[ch]) axmTemp += translate[ch];
      else axmTemp += ch;
    }
    axiom = axmTemp;
    axmTemp = "";
    console.log(axiom.length);
  }
}

const sketch = (p5: P5) => {
  let seed = Math.random() * 90;
  let dl = 4;

  p5.mouseClicked = (event) => {
    haveLive = haveLive ? 0 : 1;
  };
  const reset = () => {
    seed++;
    dl = 4;
    p5.loop();
  };

  p5.keyPressed = (event) => {
    seed++;

    p5.loop();
  };
  // The sketch setup method
  p5.setup = () => {
    const canvas = p5.createCanvas(500, 700);
    canvas.parent("app");
    p5.textSize(20);
    // p5.loop();
    // p5.background("white");
    // p5.textSize(100);

    // p5.strokeJoin(p5.MITER);
  };

  // p5.mouseClicked = () => {
  //   p5.reset();
  // };
  p5.draw = () => {
    p5.randomSeed(seed);
    // p5.text("!!!!!!!!", 1, 1, 100, 100);

    p5.fill(20);

    p5.background("#ddd");
    p5.fill("#ddd");
    p5.noStroke();
    p5.rect(0, 0, 200, 200);
    p5.stroke("#111");
    p5.fill("#111");
    p5.text(`fps: ${p5.round(p5.frameRate())}`, 0, 0, 100, 100);
    p5.text(`delta: ${p5.round(p5.deltaTime)}`, 0, 20, 100, 100);
    p5.translate(250, 700);
    drawIt(p5, dl, axiom);

    if (dl < maxDl * 0.9) {
      if (haveLive)
        dl += p5.sin((dl / maxDl) * p5.PI) * dx * p5.deltaTime * 0.02;
    } else {
      p5.noLoop();
      setTimeout(() => {
        reset();
      }, 50);
    }
  };
};

new P5(sketch);
