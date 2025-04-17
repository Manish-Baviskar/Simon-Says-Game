let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"]

let start = false;
let level = 0;
let highscore = 0;

let h2 = document.querySelector('h2');

document.addEventListener("keypress", function () {
    if(start == false){
        console.log("Game started");
        start = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout( function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout( function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level} (Highest Score: ${highscore})`;

    let rndIdx = Math.floor(Math.random() * 4);
    let rndColor = btns[rndIdx];
    let rndbtn = document.querySelector(`.${rndColor}`);
    // console.log(rndIdx);
    // console.log(rndColor);
    // console.log(rndbtn);
    gameSeq.push(rndColor);
    console.log(gameSeq);
    gameFlash(rndbtn);
}

function checkAns(idx) {
    if(userSeq[idx]===gameSeq[idx]) {
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        if(level > highscore){
            highscore = level;
        }

        h2.innerHTML = `Game over, Your score was <b>${level}</b>, Highest Score is <b>${highscore}</b> <br>Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        restart();
    }
}

function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn")
for (btn of allbtns) {
    btn.addEventListener("click", btnPress);    
}

function restart() {
    start = false;
    level = 0; 
    gameSeq = [];
    userSeq = [];
}