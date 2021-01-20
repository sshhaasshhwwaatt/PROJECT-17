//Declaration of Global Variables
var monkey,monkeyr,stop;
var banana ,bananai;
var  obstacle, block1, block2, block3
var orange, orangei;
var apple , applei
var grape , grapei
var goodluck

//Group variables
var obstacleGroup,bananaGroup,appleGroup,orangeGroup,grapeGroup;
//Score & losing system
var survivalTime,score,chances;
var ground,groundi ;
var stone12
var gameover,gameoveri;
var sun , suni
var cloud , sky1,sky2,sky3

//Game States
var SP=4
var SEVER=3;
var PLAY=2;
var END=1;
var FB=0;
var gameState=SEVER;

function preload()
{
  //To load monkey animation
  monkeyr =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  
 stop = loadAnimation("m12.png");
  

  groundi=loadImage("ground.webp");
 gameoveri=loadImage("g3.png");
   suni=loadImage("sun2.png");

  
 sky1=loadImage("cl7.png"); 
sky2=loadImage("cl4.png");
 
block1=loadImage("d5.png");  
 block2=loadImage("d1.png");
   block3=loadImage("d3.png");
  
   bananai = loadImage("a4.png");
  orangei=loadImage("a8.png");
  applei=loadImage("a9.png");
  
  gameoveri=loadImage("g3.png");
  
  good=loadImage("f2.png");


}


function setup() {
  //To create a canvas   
  createCanvas(600,410);
  
  monkey=createSprite(60,325,10,10);  
  monkey.addAnimation("run",monkeyr);
   monkey.addAnimation("collided",stop);
  //Scaling to adjust the animation
  monkey.scale=0.1;

  //monkey.debug=true;
  //To make monkey look like it is on the ground not outside it
  monkey.setCollider("rectangle",0,0,400,400);

  
  
  //To create ground sprite
  ground=createSprite(300,200,10,10);
  ground.addImage("ground",groundi);
ground.scale=1
  
  
  monkey.depth=ground.depth+1
  
   
  //Initial value of survival Time
  survivalTime=25;
  //Initial value of score
  score=0;
  //Initial value of chances
  chances=2;
  
 
 //To create sun sprite
  sun=createSprite(540,height-350,10,10)
  sun.addImage(suni);
  sun.scale=0.7;
 
  
  
  
   //To create gameover sprite
  gameover=createSprite(300,260,10,10)
  gameover.addImage("gameover",gameoveri);
  gameover.scale=2.3;
  
  //To declare new Groups
 
  obstacleGroup=createGroup();
   bananaGroup=createGroup();
   appleGroup=createGroup();
  orangeGroup=createGroup();
  grapeGroup=createGroup();
  cloudGroup=createGroup();
  
   
}

function draw()
{
  //To assign the background
  background("yellow");
  


   if(gameState===SEVER)
  {
   //To make gameover invisible
   gameover.visible=false;
    
   
    
   //Instructions for playing this game/USER GUIDE
   background("yellow");
   
    fill("red");
    stroke("red")
     strokeWeight(1)
   textSize(22);
   text("Read all the instructions carefully before playing the Game:-",10,130);
    
    
  
    fill("red");
   textSize(19);
   text("1.Press left arrow to Start the Game",40,162);
    text("2.Press Space Key for long jump",40,187);
   text("3.Press UP Arrow Key to Jump",40,212);
       text("4.Try to collect max oranges and apple  to get more survival time.",40,237);
   text("5.Don't Let Survival Time 0 otherwise you will be out .",40,262);
     text("6.Collect bananas to score and get survival time.",40,287);
   text("7.Avoid the obstacles otherwise you will lose 1 chance from 3",40,312);
   text("8.Try to Socre high, With more score game will get more difficult",40,339);
   text("9.Avoid Long Jump unnecessary as it decrease survival time",40,364);
    
  
   

    
   
   //To make sprite invisible during start state
   monkey.visible=false;
   ground.visible=false;
    sun.visible=false; 
     survivalTime.visible=false;
  score.visible=false;
  chances.visible=false;
    
   //Condition for entering in PLAY state
   if(keyDown(LEFT_ARROW))
   {
     gameState=PLAY;
   }
   
  }
  else if(gameState===PLAY)
  {
    //To make  game over invisible
   gameover.visible=false;
    
     ground.velocityX=-5;

    cloud12(); 
    stone();
    banana12();
    apple12();
    orange12();
    grape12();
    
     
      //To make monkey collide with the ground
    stone12=createSprite(300,360,600,10)
  monkey.collide(stone12);
      stone12.visible=false
    
    
    
 
    //To make the monkey jump to surmount obstacles
    if(keyDown("space")&&monkey.y>=315)
    { 
      //To assign upward velocity to monkey
      monkey.velocityY=-16.5;
        //Monkey get hungry and survival time decrease with long jump
      survivalTime=survivalTime-3;

    }
    
    //To make monkey long jump to collect oranges
    else if(keyDown("UP_ARROW")&&monkey.y>=315)
    {
      //To make monkey move up
      monkey.velocityY=-12;
          
    } 
    
    //To add gravity 
    monkey.velocityY=monkey.velocityY+0.5;
    
    
      //To increase the score when monkey touches banana and apple 
    if(monkey.isTouching(bananaGroup))
    {
      bananaGroup.destroyEach();
      score=score+5;
      survivalTime=survivalTime+3;
    }
    
    //To add bonus to score when monkey touches oranges and grapes
    if(monkey.isTouching(appleGroup))
    {
      appleGroup.destroyEach();
      score=score+7;
      survivalTime=survivalTime+5;
    } 
  
     //To increase the score when monkey touches banana and apple 
    if(monkey.isTouching(orangeGroup))
    {
      orangeGroup.destroyEach();
      score=score+10;
      survivalTime=survivalTime+7;
    }
    
    //To add bonus to score when monkey touches oranges and grapes
    if(monkey.isTouching(grapeGroup))
    {
      grapeGroup.destroyEach();
      score=score+15
      survivalTime=survivalTime+10;
    }
    
    
  //To detect and decrease the chanes when monkey touches any       obstacles
    if(monkey.isTouching( obstacleGroup))
    {
      chances=chances-1;
      obstacleGroup.destroyEach();
      
    }
     
    
    //To make sprite visible during PLAY state
   
    ground.visible=true;
    monkey.visible=true;
       sun.visible=true;
  survivalTime.visible=true; 
  score.visible=true;
  chances.visible=true;
    
  }  

  if(ground.x<100)
  {
    //To give infinite scrolling effect to ground
    ground.x=ground.width/2;
  }

 else if(gameState===END)
  {
    //To make restart & game Over invisible
    gameover.visible=true;
 
    
    //Destroying objects and setting up their velocity 0 when the     game ends
    
      //change the monkey animatio
    monkey.changeAnimation("collided",stop);
    monkey.scale=0.7
    
    ground.velocityX=0
    
    
    
    monkey.x =50
      monkey.y =330
    
    grapeGroup.setVelocityEach(0);
    grapeGroup.destroyEach();
    
    appleGroup.setVelocityEach(0);
    appleGroup.destroyEach();
    
    obstacleGroup.setVelocityEach(0);
    obstacleGroup.destroyEach();
    
    orangeGroup.setVelocityEach(0);
    orangeGroup.destroyEach();
    
    bananaGroup.setVelocityEach(0);
    bananaGroup.destroyEach();
    
    cloudGroup.setVelocityEach(0);
    
   
    
  }
  
  
  
  //End state condition
  if(chances===0||survivalTime===0)
  {
    gameState=END;
  }
   
  
   //To draw the sprites
  drawSprites();
  
   
   //Displaying scoring & losing system

  stroke("blue")
  fill("red");
  textSize(40);
  text("Scores: "+score,20,35);
  text("Survival Time: "+survivalTime,130,90);
  text("Chances: "+chances,250,35);

}



function cloud12()
{
  //To make cloud appear after every 120frames
  if(World.frameCount%120===0)
  {
  //To create cloud sprite
  cloud=createSprite(600,200,10,10);
  //To place it randomly on y axis/vertical position
  cloud.y=Math.round(random(60,150));
  
  //To assign velocity to cloud
  cloud.velocityX=-5;
  //To assign lifetime to avoid memory leaks
  cloud.setLifetime=125;
  //To add monster in enemyGroup
    
    
  var num =Math.round(random(1,2));
    cloud.scale=1
     switch(num) {
      case 1: cloud.addImage("cloud",sky1);
              break;
      case 2: cloud.addImage("sky",sky2);
              break;
            
      default: break;
    }
  
  
 
    }
  
}

function stone(){
  
  
   //To make obstacle appear after every150frames
  if(World.frameCount%150===0)
  {
  //To create obstacle sprite
  obstacle =createSprite(300,330,10,10);
  //To place it randomly on y axis/vertical position

  
  //To assign velocity to obstacle
  obstacle.velocityX=-(3+score/10);
  //To assign lifetime to avoid memory leaks
  obstacle.setLifetime=125;
    
  obstacle.setCollider("rectangle",0,0,100,80);
  obstacle.debug =false

    
  var sum =Math.round(random(1,3));
    obstacle.scale=0.9
     switch(sum) {
      case 1:  obstacle.addImage( "block",block1);
              break;
      case 2:  obstacle.addImage( "stone", block2);
              break;
     case 3:  obstacle.addImage( "pebble", block3);
              break;
      default: break;
    }
    
     monkey.depth=obstacle.depth+1 ;
    
   //Adding obstacles to obsgroup
  obstacleGroup.add(obstacle);
  
    }
  
}


function banana12()
{
  //To make banana appear at interval of 150 frames
  if(frameCount%140===0)
  {
    //To create banana sprite
    banana=createSprite(600,Math.round(random(245,250)),10,10);
    //To add image to banana
    banana.addImage("banana",bananai);
    //To assign velocity to banana
    banana.velocityX=-(2+score/10);
    //Scaling to adjust image
    banana.scale=0.4;
    //To assign lifetime to banana
    banana.lifetime=200;
    //Add banana to bananagroup
    bananaGroup.add(banana);
    
  }  
  
}

  
function apple12()
{
  //To make banana appear at interval of 200 frames
  if(frameCount%230===0)
  {
    
        //To create apple sprite
apple=createSprite(600,Math.round(random(195,200)),10,10);
    //To add image to banana
    apple.addImage("apple",applei);
    //To assign velocity to banana
   apple .velocityX=-(2+score/10);
    //Scaling to adjust image
    apple.scale=0.3;
    //To assign lifetime to banana
    apple.lifetime=200;
    //Add banana to applegroup
    appleGroup.add(apple);
    
    
  
}
  
  }
  
  
function orange12()
{
  //To make orange appear at interval of 300 frames
  if(frameCount%310===0)
  {
  //To create orange sprite
  orange=createSprite(600,Math.round(random(135,140)),10,10);
  //To add image to orange 
  orange.addImage("orange",orangei);
  //Scaling to adjust the image
  orange.scale=0.4;
  //To assign velocity to orange
  orange.velocityX=-(2+score/8);
  //To assign velocity to orange
  orange.lifetime=200;
  //To add orange to orangegroup
    orangeGroup.add(orange);

  
  
  
  }
}
  
function grape12()
{
  //To make orange appear at interval of 370 frames
  if(frameCount%375===0)
  {
  
  
    //To create grape sprite
grape=createSprite(600,Math.round(random(105,110)),10,10);
  //To add image to orange 
  grape.addImage("grape",grapei);
  //Scaling to adjust the image
  grape.scale=0.4;
  //To assign velocity to orange
  grape.velocityX=-(2+score/8);
  //To assign velocity to orange
  grape.lifetime=250;
  //Add banana to grapegroup
    grapeGroup.add(grape);

  
  
  }
}

function reset()
{
  //Initial 
  gameState=PLAY;
  score=0;
  chances=3;
  survivalTime=10;
  gameOver.visible=false;
  restart.visible=false;
}
