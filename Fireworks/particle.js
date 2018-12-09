
function Particle(x,y,hue,firework) {
  this.position = createVector(x,y);
  this.firework = firework;
  this.lifespan = 255;
  this.hue = hue

  if (firework) {
    // Plot this to create a heart. Possibly implement it as an explosion.
    //plot x=16sin^3t,  y=13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
    this.velocity = createVector(0,random(-14,-10));
  } else {
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(1,12));
  }
  this.acceleration = createVector(0,0);

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.update = function() {
    if (!this.firework) {
      this.velocity.mult(0.9);
      this.lifespan -= 3;
    }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.done = function() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    colorMode(HSB);
    if (!this.firework) {
      stroke(hue, 255, this.lifespan);
      strokeWeight(2);
    } else {
      stroke(hue, 255, 255);
      strokeWeight(4);
    }
    point(this.position.x, this.position.y);
  }
}
