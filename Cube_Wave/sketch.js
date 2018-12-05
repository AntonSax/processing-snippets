let angle = 0;
let w = 22;
let magicangle;
let maxDistance;

function setup() {
  createCanvas(400, 400, WEBGL);
  magicangle = atan(1 / sqrt(1));
  maxDistance = dist(0,0,200,200);
}

function draw() {
  background(50);
  ortho(-400,400,-400,400,0,1000);

  rotateX(-QUARTER_PI);
  rotateY(magicangle);


  let offset = 0;
  for (let z = 0; z < height; z += w) {
    for (let x = 0; x < width; x += w) {
      push();
      let d = dist(x,z,width/2,height/2);
      let offset = map(d, 0, maxDistance, -PI, PI);
      let a = angle + offset;
      let h = floor(map(sin(a),-1,1,100,400));
      translate(x - width/2, 0, z - height/2);
      box(w-2, h, w-2);
      //rect(x - width/2 + w/2, 0, w-2, h);
      pop();
    }
  }

  angle -= 0.1;
}
