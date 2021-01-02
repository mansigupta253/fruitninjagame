//GameStates
var play=1;
var end=0;
var gameState=play;

var sword, fruit,monster,fruitGroup,enemyGroup, score,r,randomfruit
var swordImage,fruit1,fruit2,fruit3,fruit4,monsterImage,gameoverImage;


function preload(){
  swordImage=loadImage("sword.png");
  monsterImage=loadAnimation("alien1.png","alien2.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  gameoverImage=loadImage("gameover.png");
  
}

function setup(){
  createCanvas(600,600);
  
  
//creating sword
  sword= createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;


//set collider for sword
 sword.setCollider("rectangle",0,0,40,40);

//score variables and groups
score=0;
fruitsGroup=createGroup();
enemyGroup=createGroup();
}
function draw(){
background("lightblue");
  
  
  if(gameState===play){
  
  //call fruit and enemy function
  fruits();
  enemy();
  
  //move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
  //Increase score if sword touching fruit
  if(fruitsGroup.isTouching(sword)){
    fruitsGroup.destroyEach();
    score=score+2;
  }
 else
    {
  //Go to the end state if sword touching enemy
    if(enemyGroup.isTouching(sword)){
      gameState=end;
      
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.setvelocityXEach(0);
      enemy.setvelocityXEach(0);
    
  
  //change the animation of sword to gameover and reset its position
sword.addImage(gameOverImage);
sword.x=200;
sword.y=200;
  }
   }
  }
drawSprites();
  
//Display score;
  text("score:"+score,300,30);
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    //fruit.debuge=true
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit);
  } else if(r==2){
    fruit.addImage(fruit2);
  } else if(r==3){
    fruit.addImage(fruit3)
  } else if(r==4){
    fruit.addImage(fruit4)
  }
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=-7;
    fruit.setLifetime=100;
  
    fruitsGroup.add(fruit);
  }
}

function enemy(){
  if(World.framCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocity=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}
