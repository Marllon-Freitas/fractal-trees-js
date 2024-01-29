let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const LEN = 180;
let rotateAngle = 0.8;
let branchLength = 0.67;
let maxDepth = 10;
ctx.lineWidth = 2;
ctx.strokeStyle = "#fff";

let angle = document.getElementById("angle");
let length = document.getElementById("length");
let depth = document.getElementById("depth");

angle.addEventListener("input", () => {
  rotateAngle = angle.value / 100;
  drawTree();
});

length.addEventListener("input", () => {
  branchLength = length.value / 100;
  drawTree();
});

depth.addEventListener("input", () => {
  maxDepth = depth.value;
  drawTree();
});

function branch(len, depth = 0) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();

  if (len < 4 || depth > maxDepth) {
    return;
  }

  ctx.translate(0, -len);

  ctx.save();
  ctx.rotate(-rotateAngle);
  branch(len * branchLength, depth + 1);
  ctx.restore();

  ctx.save();
  ctx.rotate(rotateAngle);
  branch(len * branchLength, depth + 1);
  ctx.restore();

  ctx.translate(0, len);
}

function drawTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height);
  branch(LEN);
  ctx.restore();
}
