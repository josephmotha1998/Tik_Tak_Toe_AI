let board=[
  ['','',''],
  ['','',''],
  ['','',''],
];

let w;
let h;
let ai = 'X';
let human = 'O';
let currentPlayer = human;

function setup() {
  createCanvas(400,400);
  w = width / 3;
  h = height / 3;
  bestMove();
}

function equals3(a,b,c){
  return (a==b && b==c && a!='');
}

function checkWinner(){
  let winner=null;
  //horizontal 
  for(let i=0;i<3;i++){
    if (equals3(board[i][0],board[i][1],board[i][2])){
      winner=board[i][0];
    }
  }
// vertical
  for(let j=0;j<3;j++){
    if (equals3(board[0][j],board[1][j],board[2][j])){
      winner=board[0][j];
    }
  }

//diagonal 
if(equals3(board[0][0],board[1][1],board[2][2])){
    winner=board[0][0];
}
if(equals3(board[0][2],board[1][1],board[2][0])){
  winner=board[0][2];
}

let openSpots = 0;
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (board[i][j] == '') {
      openSpots++;
    }
  }
}

if (winner == null && openSpots == 0) {
  return 'tie';
} else {
  return winner;
}
}

function bestMove(){
  //AI makes turn
  let bestScore=-Infinity;
  let move;
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      //is the spot available
        if(board[i][j]==''){
          board[i][j]=ai;
          let score= minimax(board ,false);
          board[i][j]='';
          if(score>bestScore){
            bestScore=score;
            move={i,j};
          }
      }
    }
  }
  board[move.i][move.j]=ai;
  currentPlayer=human; 
}

function mousePressed(){
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == '') {
      board[i][j] = human;
      currentPlayer = ai;
      bestMove();
    }
  }
} 

function draw() {
  background(255);
  let w = width / 3;
  let h = height / 3;

  line(w,0,w,height);
  line(w*2,0,w*2,height);
  line(0,h,width,h);
  line(0,h*2,width,h*2);
  
  for(let j =0;j<3;j++){
    for(let i=0;i<3;i++){
      let x=w*i+ w/2;
      let y=h*j+ h/2; 
      let spot=board[i][j];
      textSize(32);
      strokeWeight(4);
      if (spot==human){
        noFill();
        ellipse(x,y,w/2);
      }
      else if (spot==ai){
        let xr=w/4;
        
        line(x-xr,y-xr,x+xr,y+xr);
        line(x+xr,y-xr,x-xr,y+xr);
      }
    }
  }
  
  let result =checkWinner();
  if (result!=null){
    noLoop();
    console.log(result);
  }
}
let scores={'X':1,'O':-1,'tie':0};

function minimax(board,depth,isMaximizing){
  let result=checkWinner();
  if(result!==null){
    return scores[result];
  }

  if(isMaximizing){
    let bestScore=-Infinity;
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        if(board[i][j]==''){
          board[i][j]=ai;
          let score=minimax(board,depth+1,false);
          board[i][j]='';
          bestScore=max(score,bestScore);
        }
      }
    }
      return bestScore;
  } 
  else{
    let bestScore=Infinity;  
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        if(board[i][j]==''){
          board[i][j]=human;
          let score=minimax(board,depth+1,true);
          board[i][j]='';
          bestScore=min(score,bestScore);
        }
      }
    }
    return bestScore;
  }
    
} 
