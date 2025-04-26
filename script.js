
const players = {
    player1: "X",
    player2: "O"    
}

const Score = {
    score1: 0,
    score2: 0
}

const array = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];


const boardCells = document.getElementsByClassName('board-cell');

let currentPlayer = players.player1;

function checkCell(row, column) {
    return array[row][column] === ' ';
}

function checkTie(row, column){
    return array.flat().every(value => value !== ' ');
}

function checkWin(){
    for(let i = 0; i < 3; i++){
        if (array[i][0] === currentPlayer && array[i][1] === currentPlayer &&array[i][2] === currentPlayer) 
            return true; 
        if (array[0][i] === currentPlayer && array[1][i] === currentPlayer && array[2][i] === currentPlayer) 
            return true; 
    }

    if (array[0][0] === currentPlayer && array[1][1] === currentPlayer && array[2][2] === currentPlayer) 
        return true; 
    if (array[0][2] === currentPlayer && array[1][1] === currentPlayer && array[2][0] === currentPlayer) 
        return true; 
    
    return false;    
}

function getWinnerName(obj, value){
    let result;
    Object.keys(obj).forEach(key => {
        if(obj[key] == value){
            result = key;
        }
    })
    return result;
}

const player1Score = document.getElementById('player-1');
const player2Score = document.getElementById('player-2');

function updateScore(result){    
    if(result === "player1"){
        Score.score1++;
    } else if(result === "player2"){
        Score.score2++;
    }

    player1Score.textContent = Score.score1;
    player2Score.textContent = Score.score2;
}


function updateBoard() {
    for (let i = 0; i < boardCells.length; i++) {
        boardCells[i].addEventListener('click', (event) => {
            const btn = event.target.getAttribute('id');
            let row, column;

            switch (btn) {
                case 'board-cell-1': 
                    row = 0; column = 0; break;
                case 'board-cell-2': 
                    row = 0; column = 1; break;
                case 'board-cell-3': 
                    row = 0; column = 2; break;
                case 'board-cell-4': 
                    row = 1; column = 0; break;
                case 'board-cell-5': 
                    row = 1; column = 1; break;
                case 'board-cell-6': 
                    row = 1; column = 2; break;
                case 'board-cell-7': 
                    row = 2; column = 0; break;
                case 'board-cell-8': 
                    row = 2; column = 1; break;
                case 'board-cell-9': 
                    row = 2; column = 2; break;
                default:
                    return; 
            }

            if (!checkCell(row, column)) {
                alert('Already taken');
                return; 
            }

            array[row][column] = currentPlayer;
            event.target.textContent = currentPlayer; 

            if(checkWin()){
                let result = getWinnerName(players, currentPlayer);
                alert(`${result} has won`);
                updateScore(result);
                resetBoard();
                return;
            }

            if (checkTie()) {
                alert("It's a tie!");
                return;     
            }

            
            currentPlayer = (currentPlayer === players.player1) ? players.player2 : players.player1;
        });
    }       
}


function resetBoard(){
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array[i].length; j++){
            array[i][j] = ' ';
        }
    }

    for(let i = 0; i < boardCells.length; i++){
        boardCells[i].textContent = ' ';
    }

    currentPlayer = players.player1;
}

function resetScore(){
    Score.score1 = 0;
    Score.score2 = 0;
    player1Score.textContent = 0;
    player2Score.textContent = 0;
}

function resetTheGame(){
     resetBoard();
     resetScore();
}

const player1Name = document.getElementById('userName1');
const player2Name = document.getElementById('userName2');

function changePlayerName(){
    let player1Input = document.getElementById('player1Name').value;
    let player2Input = document.getElementById('player2Name').value;

    if(player1Input !== ''){
        player1Name.textContent = player1Input + "'s";
    } 

    if(player2Input !== ''){
        player2Name.textContent = player2Input + "'s";
    }

    document.getElementById('player1Name').value = '';
    document.getElementById('player2Name').value = '';
}

const resetBtn = document.getElementById('reset-btn');
const changeBtn = document.getElementById('changeName');
changeBtn.addEventListener('click', changePlayerName);

resetBtn.addEventListener('click', resetTheGame);

updateBoard();

