class Fireball {
    constructor(posX) {
     
      this.rx = posX; //setting the x posing where obstacle will be created  
      this.ry = height-random([120,350]);   //setting y position where obstacle will be created 
      this.spt=createSprite(this.rx, this.ry); //using rx,ry
      this.spt.shapeColor="green";
      this.spt.addAnimation("FireBall",f1_img);
      this.spt.scale=3;
      this.spt.velocityX=-3;
    }
  
}
  

