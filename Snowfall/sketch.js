// Possible creative variations:
//    Add more items to the scene
//    Add a background
//    Have snow pile up
//    Snowflake design that generate from algorithms not pictures
//    Sliders on screen to control the numbers

let snow = [];
let gravity;

let zOff = 0;

let spritesheet;
let textures = [];

function preload() {
  spritesheet = loadImage('flakes32.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0,0.01);

  for (let x = 0; x < spritesheet.width; x+=32) {
    for (let y = 0; y < spritesheet.length; y+=32) {
      let img = spritesheet.get(x,y,32,32);
      image(img,x,y);
      textures.push(img);
    }
  }

  for (let i = 0; i < 300; i++) {
    let x = random(width);
    let y = random(height);
    let design = random(textures);
    snow.push(new Snowflake(x,y,design))
  }


}

function draw() {
  background(0);
  //snow.push(new Snowflake());


  // let wx = map(mouseX, 0, width, -0.05, 0.05)
  // let wind = createVector(wx, 0);

  zOff += 0.01;

  for (flake of snow) {
    let xOff = flake.position.x / width;
    let yOff = flake.position.y / height;
    let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
    let wind = p5.Vector.fromAngle(wAngle);
    wind.mult(0.05);

    flake.applyForce(gravity);
    flake.applyForce(wind);
    flake.update();
    flake.render();
  }

  // for (let i = snow.length-1; i >= 0; i--) {
  //   if (snow[i].offScreen()) {
  //     snow.splice(i,1);
  //   }
  // }
}
