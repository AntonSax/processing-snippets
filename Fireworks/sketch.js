var fireworks = [];
var gravity;

function setup() {
  createCanvas(1000,600);
  colorMode(HSB);
  gravity = createVector(0,0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 60);
  if (random(1) < 0.05) {
    fireworks.push(new Firework());
  }
  for (var i = fireworks.length-1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i,1);
    }
  }
  console.log(fireworks.length);
}
