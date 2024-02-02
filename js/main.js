let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const lengthOfTheLine = 200;
let rotateAngle = 0.8;
let branchLength = 0.67;
let maxDepth = 12;

ctx.lineWidth = 1;
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

function drawnLine(len) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();
}

function drawnBranchWithAngle(len, angle, depth) {
  ctx.save();
  ctx.rotate(angle);
  branch(len * branchLength, depth + 1);
  ctx.restore();
}

function branch(len, depth = 0) {
  drawnLine(len);
  if (len < 4 || depth > maxDepth) {
    return;
  }

  ctx.translate(0, -len);

  drawnBranchWithAngle(len, -rotateAngle, depth);
  drawnBranchWithAngle(len, rotateAngle, depth);

  ctx.translate(0, len);
}

function drawTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height);
  branch(lengthOfTheLine)
  ctx.restore();
}

drawTree();
