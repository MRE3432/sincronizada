var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "lightyellow";


  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("lightpink");
  
    if(keyDown("a")){
      writePosition(-1,0);
    }
    else if(keyDown("d")){
      writePosition(1,0);
    }
    else if(keyDown("w")){
      writePosition(0,-1);
    }
    else if(keyDown("s")){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref("ball/position").
  set({
    "x":position.x + x, "y":position.y + y
  });
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error al escribir en la base de datos");
}
