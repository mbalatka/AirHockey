var p1, disk;
 
function setup() {
  createCanvas(800, 500);
  p1 = new Player();
  disk = new Disk();
}
 
function draw() {
  background(0);
  p1.update();
  disk.move();
  disk.collision();
  fill(0, 255, 0);
  p1.show();
 
  fill(255);
  disk.show();
  debugPrints();
}
 
function Disk() {
  this.x = width/2;
  this.y = height/2;
  this.speed = 5;
  this.angle = 0.5;
  this.radius = 25;
  this.decSpd = 0.001;
 
  this.move = function() {
    if(this.speed > 0) {
      this.speed -= this.decSpd;
    }
    if(this.speed <=0) {
      this.speed = 0;
    }
    if(this.x + this.speed * cos(this.angle) < this.radius/2 || this.x + this.speed * cos(this.angle) > width-this.radius/2) {
      if(sin(this.angle) > 0 && cos(this.angle) > 0) {//1o quadrante
        this.angle += PI/2;
      }
      else if(sin(this.angle) > 0 && cos(this.angle) < 0) {//2o quadrante
        this.angle -= PI/2;
      }
      else if(sin(this.angle) < 0 && cos(this.angle) < 0) {//3o quadrante
        this.angle += PI/2;
      }
      else if(sin(this.angle) < 0 && cos(this.angle) > 0) {//4o quadrante
        this.angle -= PI/2;
      }
    }
    if(this.y + this.speed * sin(this.angle) < this.radius/2 || this.y + this.speed * sin(this.angle) > height-this.radius/2) {
      if(sin(this.angle) > 0 && cos(this.angle) > 0) {//1o quadrante
        this.angle -= PI/2;
      }
      else if(sin(this.angle) > 0 && cos(this.angle) < 0) {//2o quadrante
        this.angle += PI/2;
      }
      else if(sin(this.angle) < 0 && cos(this.angle) < 0) {//3o quadrante
        this.angle -= PI/2;
      }
      else if(sin(this.angle) < 0 && cos(this.angle) > 0) {//4o quadrante
        this.angle += PI/2;
      }
    }
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
  }
 
  this.show = function() {
    ellipse(this.x, this.y, this.radius, this.radius);
    this.showDirection();
  }
  
  this.showDirection = function() {
    stroke(255, 255, 0);
    line(this.x, this.y, this.x+cos(this.angle)*100, this.y+sin(this.angle)*100);
  }
 
  this.collisionOld = function() { 
    p = p1;
    if(sqrt(((this.x-p.x)*(this.x-p.x)) + ((this.y-p.y)*(this.y-p.y))) < (this.radius + p.radius)/2) {
      this.angle += PI/2;
      this.speed = 5;
      //background(255, 255, 0);
    }
    while(sqrt(((this.x-p.x)*(this.x-p.x)) + ((this.y-p.y)*(this.y-p.y))) < (this.radius + p.radius)/2) {
      this.move();
    }
  }
  
  this.collision = function() { 
    p = p1;
    if(sqrt(((this.x-p.x)*(this.x-p.x)) + ((this.y-p.y)*(this.y-p.y))) < (this.radius + p.radius)/2) {
      var vxP1, vyP1, vxD, vYD, vxR, vyR;
      vxP1 = cos(p.getAngle()) * p.getSpeed();
      vyP1 = sin(p.getAngle()) * p.getSpeed();
      vxD = cos(this.angle) * this.speed;
      vyD = sin(this.angle) * this.speed;
      vxR = vxP1 + vxD - this.x;
      vyR = vyP1 + vyD - this.y;
      print("1|"+vxP1+"|");
      print("2|"+vyP1+"|");
      print("3|"+vxD+"|");
      print("4|"+vyD+"|");
      print("5|"+vxR+"|");
      print("6|"+vyR+"|");
      
      this.angle = atan2(vyR, vxR);
      debugPrints();
      noLoop();
      //this.angle += PI/2;//mudar
      this.speed = 5;//mudar
      //background(255, 255, 0);
    }
    while(sqrt(((this.x-p.x)*(this.x-p.x)) + ((this.y-p.y)*(this.y-p.y))) < (this.radius + p.radius)/2) {
      this.move();
    }
  }
};
 
function Player() {
  this.x = width/2;
  this.y = height/2;
  this.old_x = this.x;
  this.old_y = this.y;
  this.radius = 50;
 
  this.update = function() {
    this.old_x = this.x;
    this.old_y = this.y;
    this.x = mouseX;
    this.y = mouseY;
  }
 
  this.show = function() {
    ellipse(this.x, this.y, this.radius, this.radius);
    this.showDirection();
  }
  
  this.showDirection = function() {
    stroke(255, 255, 0);
    line(this.x, this.y, this.x+cos(this.getAngle())*100, this.y+sin(this.getAngle())*100);
  }
  
  
  this.getAngle = function() {
    return atan2(this.y - this.old_y, this.x - this.old_x);

  }
  
  this.getSpeed = function() {
    return sqrt(((this.x-this.old_x)*(this.x-this.old_x)) + ((this.y-this.old_y)*(this.y-this.old_y)));
  }
};

function mousePressed() {
  noLoop();
}
/*
function mouseReleased() {
  loop();
}
*/

function debugPrints() {
    text("Sin:"+sin(disk.angle), 10, 10);
    text("Cos:"+cos(disk.angle), 10, 30);
    text("velY:"+sin(disk.angle)*disk.speed, 10, 50);
    text("velX:"+cos(disk.angle)*disk.speed, 10, 70);
    text("spd:"+disk.speed, 10, 90);
    text("angle:"+disk.angle, 10, 110);
    text("playerAngle:"+p1.getAngle(), 10, 130);
    text("playerSpeed:"+p1.getSpeed(), 10, 150);
}