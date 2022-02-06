import P5 from "p5";
// import "p5/lib/addons/p5.dom";
// import "p5/lib/addons/p5.sound";	// Include if needed
import "./styles.scss";
import { drawIt } from "./drawing";
import { AXIOM11 } from "./consts";
const itr = 10;
let axiom;

if (itr === 11) axiom = AXIOM11;

if (!axiom) {
  axiom = "220";
  let axmTemp;
  let translate = { "1": "21", "0": "1[-20]+20" };
  // const t = Array.from(Array(itr).keys());

  for (let i = 0; i < itr; i += 1) {
    for (let ch of Array.from(axiom)) {
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
  let dl = 1;

  // The sketch setup method
  p5.setup = () => {
    const canvas = p5.createCanvas(500, 700);
    canvas.parent("app");
    // p5.loop();
    // p5.background("white");
    // p5.textSize(100);

    // p5.strokeJoin(p5.MITER);
  };

  p5.reset = () => {
    seed++;
    dl = 0.1;
    p5.loop();
  };

  p5.mouseClicked = () => {
    p5.reset();
  };
  p5.draw = () => {
    p5.randomSeed(seed);
    // p5.text("!!!!!!!!", 1, 1, 100, 100);
    p5.translate(250, 700);
    p5.fill(0);

    p5.background("#ddd");
    drawIt(p5, dl, axiom);

    if (dl < 11.5) dl = p5.lerp(0.1, 12, dl / 12);
    else {
      p5.noLoop();
      setTimeout(() => {
        p5.reset();
      }, 500);
    }
  };
};

new P5(sketch);
