
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");

let msgContainer = document.querySelector(".msg-container");
let winMsg = document.querySelector("#Winmsg");
let drawMsg = document.querySelector("#Drawmsg");

let turn0 = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Handle box clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.disabled) return;

        if (turn0) {
            box.innerText = "O";
            box.style.color = "grey";
            turn0 = false;
        } else {
            box.innerText = "X";
            box.style.color = "black";
            turn0 = true;
        }

        box.disabled = true;
        count++;

        // Check winner first
        let winnerFound = checkWinner();

        // Draw only if no winner exists
        if (!winnerFound && count === 9) {
            showDraw();
        }
    });
});

// Disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable and clear all boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "";
    }
};

// Reset or start a new game
const resetGame = () => {
    turn0 = true;
    count = 0;

    enableBoxes();
    msgContainer.classList.add("hide");
};

// Show winner message
const showWinner = (winner) => {
    winMsg.innerText = `Congratulations! Winner is ${winner}`;
    winMsg.classList.remove("hide");
    drawMsg.classList.add("hide");

    msgContainer.classList.remove("hide");
};

// Show draw message
const showDraw = () => {
    drawMsg.innerText = "It's a Draw!";
    drawMsg.classList.remove("hide");
    winMsg.classList.add("hide");

    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check winning patterns
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (
            pos1Val !== "" &&
            pos1Val === pos2Val &&
            pos2Val === pos3Val
        ) {
            console.log("Winner:", pos1Val);

            disableBoxes();
            showWinner(pos1Val);

            return true;
        }
    }

    return false;
};

// Button events
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
