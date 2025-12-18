let boxes = document.querySelectorAll(".box");
let playerText = document.getElementById("player");

let turn = "X";
let board = Array(9).fill("");

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {

        if(board[index] !== "") return;

        board[index] = turn;
        box.innerText = turn;

        if(checkWinner()){
            setTimeout(() => {
                alert(`Player ${turn} Wins 🎉`);
                resetGame();
            }, 200);
            return;
        }

        if(!board.includes("")){
            setTimeout(() => {
                alert("Game Draw 😐");
                resetGame();
            }, 200);
            return;
        }

        turn = turn === "X" ? "O" : "X";
        playerText.innerText = turn;
    });
});

function checkWinner(){
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === turn);
    });
}

function resetGame(){
    board.fill("");
    boxes.forEach(box => box.innerText = "");
    turn = "X";
    playerText.innerText = turn;
}