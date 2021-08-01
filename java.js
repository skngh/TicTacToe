
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".btn");
const board = document.querySelector("#board");
const gameOverScreen = document.querySelector(".game-over");
const endText = document.querySelector(".end-text");
const winnerText = document.querySelector(".winner");
const playAgainBtn = document.querySelector("#play-again");
const starterScreen = document.querySelector("#starting");
const startGame = document.querySelector(".play");
startGame.addEventListener("click", () => {
    starterScreen.style.display = "none";
    board.style.display = "block";
})
boxes.forEach(box => {
    box.addEventListener("click", () => newMove(box.id))
})
resetBtn.addEventListener("click", () => resetBoard())
playAgainBtn.addEventListener("click", () => {
    resetBoard();
    gameOverScreen.style.display = "none";
    board.style.display = "block";
})
const Gameboard = (() => {
    //Each array is a new row
    let gameArr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const changeScore = (row, col, player) => {
        gameArr[row][col] = player;
    }
    const resetScore = ()=> {
        gameArr = 
        [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }
    const checkWinner = () => {
        //check player 1 rows
        if (gameArr[0][0] == 1 && gameArr[0][1] == 1 && gameArr[0][2] == 1) {
            return 1;
        } else if (gameArr[1][0] == 1 && gameArr[1][1] == 1 && gameArr[1][2] == 1) {
            return 1;
        } else if (gameArr[2][0] == 1 && gameArr[2][1] == 1 && gameArr[2][2] == 1) {
            return 1;
        //check player 1 cols
        } else if (gameArr[0][0] == 1 && gameArr[1][0] == 1 && gameArr[2][0] == 1) {
            return 1;
        } else if (gameArr[0][1] == 1 && gameArr[1][1] == 1 && gameArr[2][1] == 1) {
            return 1;
        } else if (gameArr[0][2] == 1 && gameArr[1][2] == 1 && gameArr[2][2] == 1) {
            return 1;
        //check player 1 diag
        } else if (gameArr[0][0] == 1 && gameArr[1][1] == 1 && gameArr[2][2] == 1) {
            return 1;
        } else if (gameArr[0][2] == 1 && gameArr[1][1] == 1 && gameArr[2][0] == 1) {
            return 1;
        } 
        //check player 2 rows
        else if (gameArr[0][0] == 2 && gameArr[0][1] == 2 && gameArr[0][2] == 2) {
            return 2;
        } else if (gameArr[1][0] == 2 && gameArr[1][1] == 2 && gameArr[1][2] == 2) {
            return 2;
        } else if (gameArr[2][0] == 2 && gameArr[2][1] == 2 && gameArr[2][2] == 2) {
            return 2;
        //check player 2 cols
        } else if (gameArr[0][0] == 2 && gameArr[1][0] == 2 && gameArr[2][0] == 2) {
            return 2;
        } else if (gameArr[0][1] == 2 && gameArr[1][1] == 2 && gameArr[2][1] == 2) {
            return 2;
        } else if (gameArr[0][2] == 2 && gameArr[1][2] == 2 && gameArr[2][2] == 2) {
            return 2;
        //check player 2 diag
        } else if (gameArr[0][0] == 2 && gameArr[1][1] == 2 && gameArr[2][2] == 2) {
            return 2;
        } else if (gameArr[0][2] == 2 && gameArr[1][1] == 2 && gameArr[2][0] == 2) {
            return 2;
        } 
        for (let i = 0; i < gameArr.length; i++) {
            for (let j = 0; j < gameArr.length; j++) {
                if (gameArr[i][j] == 0) return;
            }
        }
        return "tie";

    }
    const displayScore = () => console.log(gameArr);
    const checkIfAval = (row, col) => {
        if (gameArr[row][col] == 0) return true;
        //return gameArr[row][col] == 0;
    }
    return {changeScore, displayScore, resetScore, checkWinner, checkIfAval}
})();
const resetBoard = () => {
    playerOneTurn = true;
    Gameboard.resetScore();
    boxes.forEach(box => box.textContent = "");
}

//Lets know whose turn it is
let playerOneTurn = true;
const newMove = (id) => {
    let row = convertScore(id).row;
    let col = convertScore(id).col;
    let element = document.getElementById(id);
    if (!Gameboard.checkIfAval(row, col)) return;
    if (playerOneTurn == true) {
        Gameboard.changeScore(row, col, 1);
        let imgOne = document.createElement("img");
        imgOne.src = "images/X.png"
        element.appendChild(imgOne);
        checkForWinner();
        playerOneTurn = false;
    } else {
        Gameboard.changeScore(row, col, 2);
        let imgTwo = document.createElement("img");
        imgTwo.src = "images/O.png";
        element.appendChild(imgTwo);
        checkForWinner();
        playerOneTurn = true;
    }
}
const convertScore = (pos) => {
    let row;
    let col;
    switch (pos) {
        case "1": 
            row = 0;
            col = 0;
            break;
        case "2":
            row = 0;
            col = 1;
            break;
        case "3":
            row = 0;
            col = 2;
            break;
        case "4":
            row = 1;
            col = 0;
            break;
        case "5":
            row = 1;
            col = 1;
            break;
        case "6": 
            row = 1;
            col = 2;
            break;
        case "7":
            row = 2;
            col = 0;
            break;
        case "8":
            row = 2;
            col = 1;
            break;
        case "9":
            row = 2;
            col = 2;
            break;
    }
    return {row, col};
}
const checkForWinner = () => {
    if(Gameboard.checkWinner() == 1) {
        gameOverScreen.style.display = "block";
        board.style.display = "none";
        winnerText.textContent = "Player 1 wins!";
    } else if (Gameboard.checkWinner() == 2) {
        gameOverScreen.style.display = "block";
        board.style.display = "none";
        winnerText.textContent = "Player 2 wins!";
    } else if (Gameboard.checkWinner() == "tie") {
        gameOverScreen.style.display = "block";
        board.style.display = "none";
        winnerText.textContent = "It's a tie!";
    }
}