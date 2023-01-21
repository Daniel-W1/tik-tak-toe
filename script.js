var cells = document.getElementsByClassName("cell");
var ResetButton = document.getElementsByClassName("btn")[0];
var xImage = document.getElementsByClassName("x-image")[0];
var oImage = document.getElementsByClassName("o-image")[0];
var xScore = document.getElementsByClassName("score-text-x")[0];
var oScore = document.getElementsByClassName("score-text-o")[0];
var gameOvercontainer = document.getElementsByClassName("container")[0];
var playAgainbtn = document.getElementsByClassName("play-again")[0];
var winnerName = document.getElementsByClassName("winner")[0];

// console.log(xImage, oImage);
// console.log(oScore);

ResetButton.addEventListener("click", () => {
    location.reload();
});

// console.log("here", cells);

let turn = true;
let done_cells = new Map();
var xImg = "url('./ximage.png');";
var oImg = "url('./oimage.png');";


playAgainbtn.addEventListener("click", ()=>{
    ClearBoard();
    ResetButton.disabled = false;
});


for (let idx = 0; idx < cells.length; idx++) {
    cells[idx].addEventListener("click", () => {
        if (!done_cells.has(idx)) {
            if (turn) {
                cells[idx].classList.add("done-x");
                done_cells.set(idx, xImg);
            } else {
                cells[idx].classList.add("done-o");
                done_cells.set(idx, oImg);
                
            }

            if(turn){
                xImage.classList.remove("active");
                oImage.classList.add("active");
                // console.log(oImage)
            }
            else{
                oImage.classList.remove("active");
                xImage.classList.add("active");
            }

            turn = !turn;

            let check1 = checkGameOver();
            let check2 = checkDraw();

            if (check1 != null) {
                gameOvercontainer.style.display = "block";
                ResetButton.disabled = true;

                if(!turn){
                    winnerName.textContent = "X WON !";
                    IncreaseXscore();
                }
                else{
                    winnerName.textContent = "O WON !";
                    IncreaseOscore();
                }

                turn = true;
            }
            else if (check2) {
                ResetButton.disabled = true;
                gameOvercontainer.style.display = "block";
                winnerName.textContent = "It's a draw!"
                // show the draw modal thing
                turn = true;
            }
        }
    });
}

var Xwin = '["X","X","X"]';
var Owin = '["O","O","O"]';

function ConverImgToTxt(idx) {
    if (!done_cells.has(idx)) return "!";
    return done_cells.get(idx) == xImg ? "X" : "O";
}

function checkGameOver() {
    // rows
    let first_row = [
        ConverImgToTxt(0),
        ConverImgToTxt(1),
        ConverImgToTxt(2),
    ];
    let second_row = [
        ConverImgToTxt(3),
        ConverImgToTxt(4),
        ConverImgToTxt(5),
    ];
    let third_row = [
        ConverImgToTxt(6),
        ConverImgToTxt(7),
        ConverImgToTxt(8),
    ];

    // columns
    let first_col = [
        ConverImgToTxt(0),
        ConverImgToTxt(3),
        ConverImgToTxt(6),
    ];
    let second_col = [
        ConverImgToTxt(1),
        ConverImgToTxt(4),
        ConverImgToTxt(7),
    ];
    let third_col = [
        ConverImgToTxt(2),
        ConverImgToTxt(5),
        ConverImgToTxt(8),
    ];

    // diagonals
    let first_dia = [
        ConverImgToTxt(0),
        ConverImgToTxt(4),
        ConverImgToTxt(8),
    ];
    let second_dia = [
        ConverImgToTxt(2),
        ConverImgToTxt(4),
        ConverImgToTxt(6),
    ];

    if (
        JSON.stringify(first_row) == Xwin ||
        JSON.stringify(first_row) == Owin
    ) {
        return first_row[0];
    }
    if (
        JSON.stringify(second_row) == Xwin ||
        JSON.stringify(second_row) == Owin
    ) {
        return second_row[0];
    }
    if (
        JSON.stringify(third_row) == Xwin ||
        JSON.stringify(third_row) == Owin
    ) {
        return third_row[0];
    }

    if (
        JSON.stringify(first_col) == Xwin ||
        JSON.stringify(first_col) == Owin
    ) {
        return first_col[0];
    }
    if (
        JSON.stringify(second_col) == Xwin ||
        JSON.stringify(second_col) == Owin
    ) {
        return second_col[0];
    }
    if (
        JSON.stringify(third_col) == Xwin ||
        JSON.stringify(third_col) == Owin
    ) {
        return third_col[0];
    }

    if (
        JSON.stringify(first_dia) == Xwin ||
        JSON.stringify(first_dia) == Owin
    ) {
        return first_dia[0];
    }
    if (
        JSON.stringify(second_dia) == Xwin ||
        JSON.stringify(second_dia) == Owin
    ) {
        return second_dia[0];
    }

    return null;
}

function checkDraw() {
    return done_cells.size == 9;
}

function IncreaseOscore(){
    var current_score = oScore.textContent;
    var new_score = +current_score + 1;

    oScore.textContent = new_score;
    // console.log(oScore, "here")
}
function IncreaseXscore(){
    // console.log(xScore)
    var current_score = xScore.textContent;
    var new_score = +current_score + 1;

    xScore.textContent = new_score;
}

// console.log(cells);
function ClearBoard(){

    var arr = [].slice.call(cells);
    arr.forEach(cell => {
        cell.classList.remove("done-x");
        cell.classList.remove("done-o");
    });

    // clear the map
    done_cells.clear();
    gameOvercontainer.style.display = "none";

    xImage.classList.add("active");
    oImage.classList.remove("active");

}