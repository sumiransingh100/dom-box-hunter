const main = document.querySelector("main");

const btn = document.querySelector("button");
const timer = document.querySelector("#timer");
const scoree = document.querySelector("#score");
const box = document.createElement("div");
const overLay = document.querySelector(".overlay");
box.classList.add("box");

let interval;
let gameOverTimeout;
let time = 0;
let score = 0;
let canScore = false;

const randomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

const randomBox = () => {
    box.style.backgroundColor = randomColor();
    if (!main.contains(box)) {
        main.append(box);
    }

    let mainH = main.clientHeight - box.offsetHeight;  // this is use to take parent height 
    let mainW = main.clientWidth - box.offsetWidth;

    const rY = Math.random() * mainH;
    const rX = Math.random() * mainW;

    box.style.top = `${rY}px`;
    box.style.left = `${rX}px`;
    canScore = true;
}

const resetGame = () => {
    time = 0;
    score = 0;
    canScore = false;
    timer.textContent = time;
    scoree.textContent = score;
    overLay.style.display = "none";
    if (main.contains(box)) {
        box.remove();
    }
}

btn.addEventListener("click", () => {
    clearInterval(interval);
    clearTimeout(gameOverTimeout);
    resetGame();

    randomBox();
    interval = setInterval(() => {
       randomBox();
       time += 1;
       timer.textContent = time;
    }, 1000);

    gameOverTimeout = setTimeout(() => {
        clearInterval(interval);
        canScore = false;
        overLay.style.display = "flex";

        setTimeout(() => {
            resetGame();
        }, 3000);
    }, 10000);
});


box.addEventListener("click", () => {
    if (!canScore) return;
    score += 1;
    scoree.textContent = score;
    canScore = false;
});