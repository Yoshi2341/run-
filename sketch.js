//NAME-AARON SINGH
var player,zombie,zombieboss,space,spaceImage,playerImage,zombieImage,zombiebossImage,sword,swordImage;
var END=0;
var PLAY=1
var gameState=PLAY;
var gameover,restart,gameoverImage,restartImage,score;


function preload(){
playerImage = loadImage("naruto.jpg");
zombieImage = loadImage("zom2.jpg");
zombiebossImage = loadImage("zom1.jpg");
spaceImage = loadImage("background.jpg");
gameoverImage=loadImage("gameover.jpg");
restartImage=loadImage("restart.jpg");
swordImage=loadImage("sword.jpg");
}

function setup() {
 createCanvas(600,500);
 var message = "This is a message";
 console.log(message)

space=createSprite(300,300,300,300);
space.addImage("spaceImage",spaceImage);
//space.x=space.width/2;
space.scale=2.5

player=createSprite(300, 420, 600, 10);
player.addImage("playerImage",playerImage);
player.scale=0.1;
player.setCollider("rectangle",0,0,player.width,player.height);
player.debug=false;

gameover=createSprite(300,100);
gameover.addImage("gameoverImage",gameoverImage);
gameover.scale=0.3;

restart=createSprite(300,180);
restart.addImage("restartImage",restartImage);
restart.scale=0.4;

var zombie = createSprite(600,165,10,40);
zombie.addImage("zombieImage",zombieImage)
zombie.scale=0.1
var zombieboss = createSprite(600,165,10,40);
zombieboss.addImage("zombiebossImage",zombiebossImage)
zombieboss.scale=0.1
swordsGroup=createGroup();
zombiesGroup=createGroup();

score=0;
}
function draw() {
  background(0);
 text("Score:"+score,500,100);
 stroke("black");
 fill("green");
 textSize(15);

 player.y=World.mouseY
 player.x=World.mouseX
 if(gameState===PLAY){
gameover.visible=false;
restart.visible=false;
space.velocityX=-(2+2*score/100)
score=score+Math.round(getFrameRate()/30);
if(space.x<0){
space.x=space.width/2;
}
spawnSwords();
spawnZombies();
if(zombiesGroup.isTouching(player)){
gameState=END;
}
if(swordsGroup.isTouching(player)){
score=score+10;

}
else if(gameState===END){
gameover.visible=true;
restart.visible=true;

if(mousePressedOver()){
  reset();
 
}
swordsGroup.setLifetimeEach(-1);
    zombiesGroup.setLifetimeEach(-1);
     swordsGroup.setVelocityXEach(0);
     zombiesGroup.setVelocityXEach(0);  

}

 }

  drawSprites();
}
function reset(){
  gameState=PLAY
gameover.visible=false
restart.visible=false
swordsGroup.destroyEach()
zombiesGroup.destroyEach()
player.changeAnimation("playerImage",playerImage);
score=0;
space.velocityX=0;
player.velocityY=0;

}
function spawnZombies(){
  if (frameCount % 60 === 0){
    var zombie = createSprite(600,165,10,40);
    zombie.velocityX = -(6 + score/100);
    
     
     var rand = Math.round(random(40,100));
     switch(rand) {
       case 1: zombie.addImage(zombieImage);
               break;
       case 2: zombieboss.addImage(zombiebossImage);
               break;
       default: break;
     }
    
                
     zombie.scale = 1.0;
     zombie.lifetime = 300;
    
    
     zombiesGroup.add(zombie);
}
}
function spawnSwords(){
  if (frameCount % 60 === 0) {
    var sword = createSprite(600,165,10,40);
    sword.y = Math.round(random(40,100));
    sword.addImage(swordImage);
    sword.scale = 0.1;
    sword.velocityX = -3;
    
    
    sword.lifetime = 300;
    
   
    sword.depth = player.depth;
    player.depth = player.depth + 1;
    
   
    swordsGroup.add(sword);

  }
}
 //THANK YOU


