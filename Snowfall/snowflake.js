function getRandomSize() {
  let r = pow(random(0,1), 5);
  return constrain(r * 32, 2, 32);

  // let r = randomGaussian() * 2;
  // return constrain(abs(r * r), 2, 36);

  // while (true) {
  //   let r1 = random(1);
  //   let r2 = random(1);
  //   if (r2 > r1) {
  //     return r1 * 36;
  //   }
  // }
}

class Snowflake {

  constructor(sx, sy, img) {
    let x = sx || random(width);
    let y = sy || random(-100,-10);
    this.img = img;
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector();
    this.angle = random(TWO_PI);
    this.direction = (random(1) > 0.5) ? 1 : -1;
    this.xOffset = 0;
    this.radius = getRandomSize();
  }

  applyForce(force) {
    // Parallax Effect Hack
    let f = force.copy();
    f.mult(this.r);
    this.acceleration.add(force);
  }

  randomize() {
    let x = random(width);
    let y = random(-100,-10);
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector();
    this.radius = getRandomSize();
  }

  update() {
    this.xOffset = sin(this.angle) * this.radius;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.radius*.2);

    if (this.velocity.mag() < 1) {
      this.velocity.normalize();
    }

    this.position.add(this.velocity);
    this.acceleration.mult(0);

    if (this.position.y > height + this.radius) {
      this.randomize();
    }

    // Wrapping Left and Right
    if (this.position.x < -this.radius) {
      this.position.x = width + this.radius;
    }
    if (this.position.x > width + this.radius) {
      this.position.x = -this.radius;
    }

    this.angle += this.direction * this.velocity.mag() / 200;
  }

  render() {
    // stroke(255);
    // strokeWeight(this.radius);
    // point(this.position.x, this.position.y);
    push();
    translate(this.position.x + this.xOffset,this.position.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.img, 0, 0, this.radius, this.radius);
    pop();

  }

  offScreen() {
    return (this.position.y > height + this.radius ||
            this.position.x < -this.radius ||
            this.position.x > width + this.radius);
  }
}
