const colors = {
    "red": "255, 0, 0",
    "green": "0, 255, 0",
    "blue": "0, 0, 255",
    "yellow": "255, 255, 0",
    "cyan": "0, 255, 255",
    "magenta": "255, 0, 255",
    "black": "0, 0, 0",
    "white": "255, 255, 255",
    "gray": "128, 128, 128",
    "brown": "139, 69, 19",
    "orange": "255, 165, 0",
    "pink": "255, 192, 203",
    "purple": "128, 0, 128",
    "violet": "238, 130, 238",
    "indigo": "75, 0, 130",
    "crimson": "220, 20, 60",
    "gold": "255, 215, 0",
    "silver": "192, 192, 192",
    "bronze": "205, 127, 50"
};

let score = 0;
let meter = 0;
let multiplier = 1;
let gameRunning = false;
let timer = 0;

const sleep = ms => new Promise(r => setTimeout(r, ms));

function getRandomColor() {
    const colorNames = Object.keys(colors);
    const randomIndex = Math.floor(Math.random() * colorNames.length);
    return colorNames[randomIndex];
}

function getDifferentColor() {
    let newColor = getRandomColor();
    return newColor;
}

function generateColorMatch() {
    document.getElementById('score').innerText = score;
    const color1 = getRandomColor();
    const color2 = getRandomColor();
  
    document.getElementById('left-card').innerText = color1;
    document.getElementById('right-card').innerText = color2;

    const randomColor1 = getDifferentColor();
    const randomColor2 = getDifferentColor();

    const rgbRandom1 = colors[randomColor1];
    const rgbRandom2 = colors[randomColor2];
  
    document.getElementById('left-card').style.color = `rgb(${rgbRandom1})`;
    document.getElementById('right-card').style.color = `rgb(${rgbRandom2})`;
}
  
function rgbToColorName(rgb) {
    const color = rgb.replace('rgb(', '').replace(')', '').split(',').map(num => parseInt(num.trim()));
  
    for (const [name, value] of Object.entries(colors)) {
      const valueArr = value.split(',').map(num => parseInt(num.trim()));
      if (JSON.stringify(valueArr) === JSON.stringify(color)) {
        return name;
      }
    }
    return null;
}

function colorMatchesWithText() {
    if (`rgb(${colors[document.getElementById('right-card').innerText]})` == document.getElementById('left-card').style.color) {
        score += 50 * multiplier;
        checkForLevelUp();
    } else {
        resetLevel();
    }
    generateColorMatch()
}

function colorDoesntMatchWithText() {
    if (`rgb(${colors[document.getElementById('right-card').innerText]})` != document.getElementById('left-card').style.color) {
        score += 50 * multiplier;
        checkForLevelUp();
    } else {
        resetLevel();
    }
    generateColorMatch();
}

function resetLevel() {
    const width = document.getElementById('meter-fill').style.width;
    if(width == "0%") {
        if(multiplier > 1) {
            multiplier -= 1;
        }
        document.getElementById('multiplier').innerText = multiplier
    } else {
        meter = 0;
        document.getElementById('meter-fill').style.width = (meter / 4) * 100 + "%"
    }
}

function checkForLevelUp() {
    if((meter + 1) >= 4) {
        meter = 0;
        if(multiplier < 10) {
            multiplier += 1
        }
    } else {
        meter++;
    }
    document.getElementById('multiplier').innerText = multiplier
    document.getElementById('meter-fill').style.width = (meter / 4) * 100 + "%"
}

function handleAnswer(status) {
    if(!gameRunning) return;
    if(status) return colorMatchesWithText();

    colorDoesntMatchWithText();
}

function stopGame() {
    if(!gameRunning) return;
    gameRunning = false
    document.getElementById('left-card').innerText = "-";
    document.getElementById('right-card').innerText = "-";
    document.getElementById('left-card').style.color = `rgb(0,0,0)`;
    document.getElementById('right-card').style.color = `rgb(0,0,0)`;
}

async function startGame() {
    if(gameRunning) return;
    gameRunning = true;
    timer = 20;
    meter = 0;
    multiplier = 1;
    score = 0;
    document.getElementById('multiplier').innerText = multiplier
    document.getElementById('meter-fill').style.width = (meter / 4) * 100 + "%"
    generateColorMatch();
    while(timer > 0) {
        document.getElementById('timer').innerText = timer;
        await sleep(1000);
        timer -= 1;
    }
    timer = 0;
    document.getElementById('timer').innerText = timer;
    stopGame();
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', async (ev) => {
        if(!gameRunning) return;
        if (ev.key === "ArrowRight") {
            colorMatchesWithText();
            document.getElementById('yes').style.opacity = 0.7;
            await sleep(200);
            document.getElementById('yes').style.opacity = 1;
        } else if (ev.key === "ArrowLeft") {
            colorDoesntMatchWithText();
            document.getElementById('no').style.opacity = 0.7;
            await sleep(200);
            document.getElementById('no').style.opacity = 1;
        }
    })
})