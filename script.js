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
  
    document.getElementById('szin').innerText = color1;
    document.getElementById('szin2').innerText = color2;

    const randomColor1 = getDifferentColor();
    const randomColor2 = getDifferentColor();

    const rgbRandom1 = colors[randomColor1];
    const rgbRandom2 = colors[randomColor2];
  
    document.getElementById('szin').style.color = `rgb(${rgbRandom1})`;
    document.getElementById('szin2').style.color = `rgb(${rgbRandom2})`;
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
    if (`rgb(${colors[document.getElementById('szin2').innerText]})` == document.getElementById('szin').style.color) {
        score++;
    }
    generateColorMatch()
}

function colorDoesntMatchWithText() {
    if (`rgb(${colors[document.getElementById('szin2').innerText]})` != document.getElementById('szin').style.color) {
        score++;
    }
    generateColorMatch();
}

document.addEventListener('DOMContentLoaded', () => {
    generateColorMatch();

    document.addEventListener('keydown', (ev) => {
        if (ev.key === "ArrowRight") {
            colorMatchesWithText();
        } else if (ev.key === "ArrowLeft") {
            colorDoesntMatchWithText();
        }
    })
})