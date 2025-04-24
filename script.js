// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });


// function displayBoard(){
//     console.clear();
//     console.log("1: TOP LEFT");
//     console.log("2: TOP MIDDLE");
//     console.log("3: TOP RIGHT");
//     console.log("4: MIDDLE LEFT");
//     console.log("5: CENTER");
//     console.log("6: MIDDLE RIGHT");
//     console.log("7: BOTTOM LEFT");
//     console.log("8: BOTTOM MIDDLE");
//     console.log("9: BOTTOM RIGHT");
//     console.log('');

//     console.log(' ' +array[0][0] +' | ' + array[0][1] + ' | ' + array[0][2]);
//     console.log('---|---|---');
//     console.log(' ' + array[1][0] + ' | ' + array[1][1] + ' | ' + array[1][2]);
//     console.log('---|---|---');
//     console.log(' ' + array[2][0] + ' | ' + array[2][1] + ' | ' + array[2][2]);
//     console.log('');    
// }

// let player = 'X';

// function checkWin() {    
//     for (let i = 0; i < 3; i++) {
//         if (array[i][0] === player && array[i][1] === player &&array[i][2] === player) return true; 
//         if (array[0][i] === player && array[1][i] === player && array[2][i] === player) return true; 
//     }
//     if (array[0][0] === player && array[1][1] === player && array[2][2] === player) return true; 
//     if (array[0][2] === player && array[1][1] === player && array[2][0] === player) return true; 
//     return false;
// }

// function updateBoard() {
//     rl.question("Enter the position (1-9): ", (userInput) => {
//         let row, col;

//         switch (userInput) {
//             case '1': row = 0; col = 0; break;
//             case '2': row = 0; col = 1; break;
//             case '3': row = 0; col = 2; break;
//             case '4': row = 1; col = 0; break;
//             case '5': row = 1; col = 1; break;
//             case '6': row = 1; col = 2; break;
//             case '7': row = 2; col = 0; break;
//             case '8': row = 2; col = 1; break;
//             case '9': row = 2; col = 2; break;
//             default:
//                 console.log("Invalid input. Please enter a number between 1 and 9.");
//                 return updateBoard();
//         }

//         if (array[row][col] !== ' ') {
//             console.log("Position already taken");
//             return updateBoard();
//         }

//         array[row][col] = player;
//         displayBoard(); 

//         if (checkWin()) {
//             console.log(`Player ${player} wins!`);
//             rl.close(); 
//             return;
//         }
  
//         player = (player === 'X') ? 'O' : 'X';

//         updateBoard(); 
//     });
// }

// displayBoard();
// updateBoard();

const array = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

const boardCells = document.getElementsByClassName('board-cell');

let player = 'X';

function checkCell(row, column) {
    return array[row][column] === ' ';
}

function checkTie(row, column){
    return array.flat().every(value => value !== ' ');
}

function checkWin(){
    for(let i = 0; i < 3; i++){
        if (array[i][0] === player && array[i][1] === player &&array[i][2] === player) 
            return true; 
        if (array[0][i] === player && array[1][i] === player && array[2][i] === player) 
            return true; 
    }

    if (array[0][0] === player && array[1][1] === player && array[2][2] === player) 
        return true; 
    if (array[0][2] === player && array[1][1] === player && array[2][0] === player) 
        return true; 
    
    return false;    
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

            array[row][column] = player;
            event.target.textContent = player; 

            if(checkWin()){
                alert(`Player ${player} have won`);
                return;
            }

            if (checkTie()) {
                alert("It's a tie!");
                return;     
            }

            


            player = (player === 'X') ? 'O' : 'X';
        });
    }       
}

updateBoard();