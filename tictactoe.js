//Rishabh Khatri
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let w;
let h;

let ai = 'X';
let human = 'O';
let currentPlayer = human;

function setup() {
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
  bestMove();
}

function checkWinner(){
  let winner = null;
  
  //horizontal
  for(let i=0;i<3;i++)
  {
    if( board[i][0]!='' && board[i][0] == board[i][1] && board[i][1] == board[i][2]){
      winner = board[i][0];
    }
    
  }
  //vertical
  for(let i=0;i<3;i++){
    if( board[0][i]!='' && board[0][i] == board[1][i] && board[1][i] == board[2][i]){
      winner = board[0][i];
    }
    
  }
  //diagonal
  if( board[0][0]!='' && board[0][0] == board[1][1] && board[1][1] == board[2][2])
      winner = board[0][0];
  
  if( board[2][0]!='' && board[2][0] == board[1][1] && board[1][1] == board[0][2])
      winner = board[2][0];
  
  let openSpots=0;
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      if(board[i][j] == ''){
          openSpots++;
      }
    }
  }
  
  if(openSpots == 0 && winner == null){
    return 'tie';
  }
  else{
      return winner;
  }
}

function mousePressed() {
   if(currentPlayer == human){
     let i = floor(mouseX / w);
     let j = floor(mouseY / h);
     if(board[i][j] == ''){
       board[i][j] = human;
       currenPlayer = ai;
       bestMove();
     }
   }
 }

function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == '') {
        board[i][j] = ai;
        let score = minimax(board, 0, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
}

let scores = {
  X: 1,
  O: -1,
  tie: 0
};

function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = '';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = '';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
 
function draw() {
  background(255);
  strokeWeight(4);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r=w/4;
      if (spot == human) {
        noFill();
        ellipse(x, y, 2*r);
      } else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }
  
  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html("Tie!")
    } else {
      resultP.html(`You Lose!`);
  	}
  }
}
  	