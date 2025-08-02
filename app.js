let boxes = document.querySelectorAll(".box"); // accessing all the boxes from the class name and this returns a nodelist (like array)
let resetBtn = document.querySelector("#reset-btn"); // accessing reset btn from the id
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let container = document.querySelector(".container");

let turnO = true //if turn = true then playerO turn, else playerX turn

const winPratterns = [ //this holds all the winning patterns in 2D array or arrays of array
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const restGame =() =>{
    turnO = true;
    enableBoxes(); //enables all the boxes
    msgContainer.classList.add("hide");
}

newGameBtn.addEventListener("click", restGame);
resetBtn.addEventListener("click", restGame);

const draw =()=>{
    msg.innerText = "Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

boxes.forEach((box) =>{ //checking for the each box
    box.addEventListener("click", () => { //if box is clicked, eventListener will get to know
        // console.log("box was clicked");
        if(turnO){ //check the turn, value if true then playerO turn else playerX turn
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; //we disable that box as we are not allowed to update the box value in tic tac toe

        checkWinner(); //as the turn is complete we have to check for the winner
    });
});

const disableBoxes = () =>{ //disable all the boxes
    for(let box of boxes){
        box.disabled = true;
    }
    container.classList.add("hide"); //hide the tic tac toe games;
    resetBtn.classList.add("hide"); //hide the reset button;
}

const enableBoxes = () =>{ //enable all the boxes as new game begins
    for(let box of boxes){
        box.disabled = false;
        box.innerText = ""; //empty the boxes
    }
    container.classList.remove("hide"); //show the tic tac toe games;
    resetBtn.classList.remove("hide"); //show the reset button;

}


const showWinner = (winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes(); //disable all the boxes as we get a winner and hide the boxes and the reset button
}


const checkWinner = () => {
    let winnerFound = false;
    
    for(pattern of winPratterns){ //we traverse the whole winPatterns array to check if we got a winner or not
        /*
        console.log(pattern[0], pattern[1], pattern[2]); // we check the value of the boxes
        //console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]); // now we check the value at the position of boxes drived from the winPattern element.
        console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText); // Now here, we get the value/symbol present inside the box
        */
       let pos1Val = boxes[pattern[0]].innerText; //now, we have the 3 postion by above logic, and now we will check the winPattern for these positions
       let pos2Val = boxes[pattern[1]].innerText;
       let pos3Val = boxes[pattern[2]].innerText;

       if(pos1Val !="" && pos2Val != "" && pos3Val !=""){ //Check winPattern only when all three are non empty as the empty position can never be a winning pattern
        if((pos1Val === pos2Val) && (pos2Val === pos3Val)){ //if all three positions are same then only we gets a winner
            // console.log("WINNER", pos1Val); //winner is same as position Value
            showWinner(pos1Val);
            winnerFound = true;
            return; // stop further checking once winner is found
        }
       }
    }

    // If all boxes are filled and no winner, it's a draw
    let allFilled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            allFilled = false;
            break;
        }
    }

    if (!winnerFound && allFilled) {
        draw(); // call your draw() function
    }
}

