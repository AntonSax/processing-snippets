class Drop {
  float x = random(width);
  float y = random(-500,-50);
  float z = random(0,20);
  float len = map(z, 0, 20, 10, 20);
  float yspeed = map(z,0,20,1,8);
  
  void fall() {
    y = y + yspeed;
    yspeed = yspeed + 0.01;
    
    if (y > height) {
      y = random(-200,-100);
      yspeed = map(z,0,20,4,10);
    }
  }
  
  void show() {
    float thick = map(z,0,20,0.5,1.5);
    strokeWeight(thick);
    stroke(138,43,226);
    line(x,y,x,y+len);
  }
}
