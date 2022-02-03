var smarty;
var platformGroup, obstacleGroup;
var smartyAnimation, obstacleAnimation, wallAnimation, groundAnimation,background1_img,f1_img,f2_img,f3_img;
var flag;
var fireBall,fireBallGroup;
var LOSE=0;
var PLAY=1;
var WIN=2;
var gameState=PLAY;
function preload()
{
  smartyAnimation=loadAnimation("images/Capture1.png","images/Capture2.png","images/Capture3.png");
  obstacleAnimation=loadAnimation("images/obstacle1.png");
  wallAnimation=loadAnimation("images/wall.png");
  groundAnimation=loadAnimation("images/ground.jpg");  
  flagAnimation=loadAnimation("images/Flag.png");
  f1_img=loadAnimation("images/f1.png","images/f2.png","images/f3.png");
  
}

function setup() {
  //Creating canvas equal to width and height of display
  createCanvas(displayWidth,668);
  var countDistanceX = 0;
  var platform;
  var gap;
  
  //creating a player mario
  smarty = new Player();
  
  //creating a group
  platformGroup= createGroup();
  obstacleGroup=createGroup();
  fireBallGroup=createGroup();

  //adding platforms to stand for mario
  for (var i=0;i<26;i++)
	 {
     frameRate(30);
      platform = new Platform(countDistanceX);
      platformGroup.add(platform.spt);//Adding each new platform to platformGroup
      gap=random([0,0,0,0,200]);//givin randome value to gap
      countDistanceX = countDistanceX + platform.spt.width + gap; //counting x location of next platform to be build
      //adding wall to the game
      if(i%3===0)
      {
      wall=new Wall(countDistanceX);
      platformGroup.add(wall.spt);
      }
      //adding obstacles to the game
      if(i%4==0)
      {
      obstacle=new Obstacle(countDistanceX);
      obstacleGroup.add(obstacle.spt);
      }
      /*if(i%10.9)
      {
        fireBall=new Fireball(countDistanceX);
      fireBallGroup.add(fireBall.spt);
      }*/
  }
  flag=createSprite(countDistanceX-150,height-320);
  flag.addAnimation("flagimg",flagAnimation);
  flag.scale=0.09;
  flag.setCollider("rectangle",0,0,1100,6520);
}

function draw() {
  background('#696969');
  //code to move the camera
  translate(  -smarty.spt.x + width/2 , 0);
  if(gameState==PLAY)//Play state
  {  
       //changing the game states
       if(obstacleGroup.isTouching(smarty.spt) || smarty.spt.y>height)
       {  
         gameState=LOSE;
       } 
    
       if(flag.isTouching(smarty.spt))
       {
          gameState=WIN;
       }
       //apply gravity to mario and set colliding with platforms
        smarty.applyGravity();
        smarty.spt.collide(platformGroup);
        
        //Calling various function to controll mario
        if (keyDown("left"))  
        { 
          smarty.moveLeft();
        }
        if (keyDown("right")) 
        { 
          smarty.moveRight();
        }
        if (keyDown("up") && smarty.spt.velocityY===0) 
        {
          smarty.jump();
        }


   }

  if(gameState==LOSE)//END State
  {  
    stroke("red");
    fill("red");
    textSize(40);
    text("GAME OVER",smarty.spt.x,300);
    obstacleGroup.destroyEach();
    smarty.spt.setVelocity(0,0);
    smarty.spt.pause();
    
  }

  if(gameState==WIN)//WIN state
  {  
    stroke("green");
    fill("green");
    textSize(40);
    text("Winner",smarty.spt.x,300);
    obstacleGroup.destroyEach();
    smarty.spt.setVelocity(0,0);
    smarty.spt.pause();
  }
  

   drawSprites();
}



