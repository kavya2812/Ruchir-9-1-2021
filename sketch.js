var backImage,backgr;

var ground;

var player, player_running;

var banana ,bananaImage, obstacle, obstacle_img;

var FoodGroup,obstacleGroup;

var score=0;

function preload(){
  backImage=loadImage("images/jungle.jpg");
  
  player_running = loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png","images/Monkey_10.png");

  bananaImage = loadImage("images/banana.png");
  obstacle_img = loadImage("images/stone.png"); 
  
}

function setup() {
  canvas = createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.velocityX=-2;
  
  ground = createSprite(400,400,800,160);
  ground.visible=false; 
 
  
  player = createSprite(200,300);
  player.addAnimation("monkey",player_running);
  player.scale=0.1;    
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
}

function draw() {
  
  background(255); 

  if(backgr.x<300){
    backgr.x=backgr.width/2;
  }
  
  player.collide(ground);
  
  if(keyDown("space")&& player.y >= 250) {
    player.velocityY=-13;    
  }
  
  player.velocityY = player.velocityY + 0.5;
  
  if(FoodGroup.isTouching(player)) {
    FoodGroup.destroyEach();
    score = score+1;
  }
  
  if(obstacleGroup.isTouching(player)) {
    player.scale=0.1;
  }
  
  switch(score) {
    case 10: player.scale=0.12;
      break;
    case 20: player.scale=0.14;
      break;
    case 30: player.scale=0.16;
      break;
    case 40: player.scale=0.18;
      break;
    case 50: player.scale=0.2;
      break;
    case 60: player.scale=0.22;
      break;
    default: break; 
  }
  
  food();
  spawnObstacle();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
  
}
function food() {
  if(World.frameCount%80===0){
    banana = createSprite(800,0,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.velocityX=-4;
    banana.y = Math.round(random(120,200));
    banana.lifetime=200;
    FoodGroup.add(banana); 
  }
}

function spawnObstacle() {
  if(World.frameCount%300===0) {
    obstacle = createSprite(800,300,10,10);
    obstacle.addImage(obstacle_img);
    obstacle.scale=0.25;
    obstacle.velocityX=-6;
    obstacle.lifetime=133;
    obstacleGroup.add(obstacle);
  }
}
