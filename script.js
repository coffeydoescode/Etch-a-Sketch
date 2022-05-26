const divContainer = document.querySelector(".container");

let colorStatus;
let randomStatus;
let darkenStatus;
let lightenStatus;

const colorBtn = document.querySelector(".color-btn");
const randomBtn = document.querySelector(".random-btn");

function createRow() {
  const rowBuild = document.createElement("div");
  rowBuild.className = "row";
  divContainer.append(rowBuild);
}
// This function builds a row inside the canvas

function rowCount(numbOfRows) {
  for (let i = 0; i < numbOfRows; i++) {
    createRow();
  }
}
// This function builds a given amount of rows based on numOfRows specified

function createColumn(selector) {
  const column = document.createElement("div");
  column.className = "column";
  column.classList.add("grid-lines");
  selector.append(column);
}

// This function builds a column and appends it to the chosen selector

function columnCount(numbOfColumns, currentRow) {
  for (let i = 0; i < numbOfColumns; i++) {
    createColumn(currentRow);
  }
}
// This function builds a given amount of columns based on numOfColums specified

function getColumnArray() {
  let totalColumns = document.querySelectorAll(".column");
  let currentColumnArray = Array.from(totalColumns);
  return currentColumnArray;
}

// This function creates an array based on the current number of columns
const columnArray = getColumnArray;

function getRowArray() {
  let totalRows = document.querySelectorAll(".row");
  let currentRowArray = Array.from(totalRows);
  return currentRowArray;
}

const rowArray = getRowArray();

function gridBuilder(length) {
  gridClear();
  rowCount(length);
  rows = getRowArray();
  for (let i = 0; i < rows.length; i++) {
    let currentRow = rows[i];
    rows[i] = document.querySelector(".row");
    columnCount(length, currentRow);
  }
  if (isSelected(colorBtn) == true) {
    colorOn();
  } else if (isSelected(randomBtn) == true) {
    activateRandom();
  }
}
// This function updates the grid size based on the given number

function randomCol() {
  return Math.floor(Math.random() * 255);
}

function randomRGB() {
  let color =
    "rgb(" + randomCol() + "," + randomCol() + "," + randomCol() + ")";
  return `${color}`;
}

let setColor = function (newColor) {
  color = newColor;
};
setColor("#F6BD60");

const clearBtn = document.querySelector(".clear-btn");
function whiteOut(element) {
  element.style.backgroundColor = "white";
}

function cleanSlate() {
  columns = columnArray();
  columns.forEach((element) => whiteOut(element));
}
// This function sets all canvas columns background colors to white

clearBtn.addEventListener("click", () => {
  cleanSlate();
});

const gridSize = document.getElementById("grid-size");

let inputValue = gridSize.value;
const currentGridSize = document.querySelector(".grid-label");
currentGridSize.textContent = `${inputValue} X ${inputValue}`;

function updateLabel() {
  gridSize.addEventListener("input", () => {
    currentGridSize.textContent = `${gridSize.value} X ${gridSize.value}`;
  });
}
updateLabel();

function gridClear() {
  rows = getRowArray();
  for (let i = 0; i < rows.length; i++) {
    rows[i].remove();
  }
}
// This function removes all rows and colums

function resizeGrid() {
  gridSize.addEventListener("change", () => {
    newInputValue = gridSize.value;
    gridBuilder(gridSize.value);
    if (isSelected(gridLinesInput) == false) {
      columns = columnArray();
      columns.forEach((element) => {
        element.classList.remove("grid-lines");
      });
    }
  });
}
resizeGrid();
// This function updates the grid size
const defaultGrid = gridSize.value;
gridBuilder(defaultGrid);
setColor(color);

const gridLinesInput = document.querySelector(".grid-lines-toggle");

gridLinesInput.addEventListener("click", () => {
  columns = columnArray();
  columns.forEach((element) => {
    element.classList.toggle("grid-lines");
  });
  gridLinesInput.classList.toggle("selected");
});

function brushOn(currentDiv) {
  currentDiv.target.style.backgroundColor = color;
}

function colorOn() {
  colorBtn.classList.add("selected");
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.addEventListener("mouseenter", brushOn);
  }
}

function colorOff() {
  colorBtn.classList.remove("selected");
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.removeEventListener("mouseenter", brushOn);
  }
}

function colorBtnHandler() {
  if (isSelected(colorBtn) == true) {
    colorOff();
  } else if (isSelected(colorBtn) != true) {
    shadingOff();
    deactivateRandom();
    lightenOff();
    colorOn();
  }
}

function startPainting() {
  colorBtn.addEventListener("click", colorBtnHandler);
  randomBtn.addEventListener("click", randomBtnHandler);
  darkenBtn.addEventListener("click", handleDarken);
  lightenBtn.addEventListener("click", handleLighten);
  divContainer.addEventListener("dblclick", handleDBL);
}

const colorChoice = document.getElementById("pick-color");

function handleColor() {
  color = colorChoice.value;
  setColor(color);
}
handleColor();

colorChoice.addEventListener("change", handleColor);

const darkenBtn = document.querySelector(".darken");

// darkenBtn.addEventListener("click", handleDarken);

function handleDarken() {
  if (isSelected(darkenBtn) != true) {
    colorOff();
    deactivateRandom();
    lightenOff();
    shadingOn();
  } else if (isSelected(darkenBtn) == true) {
    shadingOff();
  }
}

function shadingOff() {
  darkenBtn.classList.remove("selected");
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.removeEventListener("mouseenter", darken);
  }
}

function shadingOn() {
  darkenBtn.classList.add("selected");
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.addEventListener("mouseenter", darken);
  }
}
function darken(currentDiv) {
  let currentColor = checkStyle(currentDiv.target);
  formatRGB(currentColor);
  formatHSL(formatRGB(currentColor));
  let newColor = darkenHSL(formatRGB(currentColor));
  currentDiv.target.style.backgroundColor = newColor;
}

const lightenBtn = document.querySelector(".lighten");

// lightenBtn.addEventListener("click", handleLighten);

function handleLighten() {
  if (isSelected(lightenBtn) != true) {
    colorOff();
    deactivateRandom();
    shadingOff();
    lightenOn();
  } else if (isSelected(lightenBtn) == true) {
    lightenOff();
  }
}

function lightenOn() {
  lightenBtn.classList.add("selected");
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.addEventListener("mouseenter", lighten);
  }
}

function lightenOff() {
  lightenBtn.classList.remove("selected");
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.removeEventListener("mouseenter", lighten);
  }
}

function lighten(currentDiv) {
  let currentColor = checkStyle(currentDiv.target);
  formatRGB(currentColor);
  formatHSL(formatRGB(currentColor));
  let newColor = lightenHSL(formatRGB(currentColor));
  currentDiv.target.style.backgroundColor = newColor;
}

function getRandomColor(array) {
  let randomIndex = [Math.floor(Math.random() * array.length)];
  let randomColor = array[randomIndex];
  return randomColor;
}

function handleRandom(currentDiv) {
  color = randomRGB();
  currentDiv.target.style.backgroundColor = color;
}

function randomBtnHandler() {
  if (isSelected(colorBtn) == true || isSelected(randomBtn) != true) {
    colorOff();
    shadingOff();
    lightenOff();
    activateRandom();
  } else if (isSelected(randomBtn) == true) {
    deactivateRandom();
  }
}

function activateRandom() {
  randomBtn.classList.add("selected");
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.addEventListener("mouseenter", handleRandom);
  }
}

function deactivateRandom() {
  randomBtn.classList.remove("selected");
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.removeEventListener("mouseenter", handleRandom);
  }
  setColor(colorChoice.value);
}

function isSelected(element) {
  if (element.classList.contains("selected")) {
    return true;
  } else {
    return false;
  }
}
function hexToRGB(h) {
  let r = 0,
    g = 0,
    b = 0;

  if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  return +r + "," + +g + "," + +b;
}

const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  let H = Math.floor(60 * h < 0 ? 60 * h + 360 : 60 * h);
  let S = Math.floor(
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
  );
  let L = Math.floor((100 * (2 * l - s)) / 2);
  return `hsl(${H},${S}%,${L}%)`;
};

let abc = "rgb(19,25,255)";

function formatRGB(rgb) {
  const rgbColor = rgb;

  let rgbStart = rgbColor.indexOf("(");

  let rgbEnd = rgbColor.indexOf(")");

  let cleanRGB = rgbColor.slice(rgbStart + 1, rgbEnd);

  let rgbArray = cleanRGB.split(",");

  let redChannel = rgbArray[0];

  let greenChannel = rgbArray[1];

  let blueChannel = rgbArray[2];
  return RGBToHSL(redChannel, greenChannel, blueChannel);
}

let oldHSL = "hsl(238,100%,53%)";

function formatHSL(hsl) {
  let hslStart = hsl.indexOf("(");

  let hslEnd = hsl.indexOf(")");

  let cleanHSL = hsl.slice(hslStart + 1, hslEnd);

  let HSLarray = cleanHSL.split(",");

  let hue = HSLarray[0];

  let s = HSLarray[1];
  let sIndex = s.indexOf("%");

  let saturation = s.slice(0, sIndex);

  let l = HSLarray[2];

  let lIndex = l.indexOf("%");

  let lightness = l.slice(0, lIndex);
  let newHSL = [hue, saturation, lightness];

  return newHSL;
}

function toNum(string) {
  let number = parseInt(string);
  return number;
}

function addlightness(LValue) {
  let x = toNum(LValue);
  x += 10;
  if (x > 100) {
    x = 100;
  }
  return x;
}

function subtractlightness(LValue) {
  let x = toNum(LValue);
  x -= 10;
  if (x < 0) {
    x = 0;
  }
  return x;
}

function newHSL(hue, saturation, lightness) {
  let newHSL = `hsl(${hue},${saturation}%,${lightness}%)`;
  return newHSL;
}

function lightenHSL(hslColor) {
  let oldHSL = Array.from(formatHSL(hslColor));
  let hue = oldHSL[0];
  let saturation = oldHSL[1];
  let lightness = oldHSL[2];
  lightness = addlightness(lightness);
  return newHSL(hue, saturation, lightness);
}

function darkenHSL(hslColor) {
  let oldHSL = Array.from(formatHSL(hslColor));
  let hue = oldHSL[0];
  let saturation = oldHSL[1];
  let lightness = oldHSL[2];
  lightness = subtractlightness(lightness);
  return newHSL(hue, saturation, lightness);
}

function checkColor(currentColor) {
  let colorType = currentColor.slice(0, 3);
  if (colorType == "rgb") {
    return "rgb";
  } else if (colorType == "hsl") {
    return "hsl";
  } else if ((colorType = "")) {
    console.error("color is not defined");
  }
}

function checkStyle(element) {
  let currentColor = getComputedStyle(element);
  return currentColor.backgroundColor;
}

const btnArray = [colorBtn, darkenBtn, lightenBtn, randomBtn];

const statusArray = [randomStatus, colorStatus, darkenStatus, lightenStatus];

function handleDBL(e) {
  let currentTool = checkBtn();
  console.log(currentTool);
  checkPausedTool();
  pauseRandomBtn(currentTool);
  checkPausedTool();
  pauseColorBtn(currentTool);
  checkPausedTool();
  pauseDarkenBtn(currentTool);
  checkPausedTool();
  pauseLightenBtn(currentTool);
}

function checkPausedTool() {
  if (randomStatus == "paused" && isSelected(randomBtn) == false) {
    console.log(isSelected(randomBtn));
    let columns = columnArray();
    for (i = 0; i < columns.length; i++) {
      let currentDiv = columns[i];
      currentDiv.removeEventListener("mouseenter", handleRandom);
    }
    return (randomStatus = "");
  } else if (colorStatus == "paused" && isSelected(colorBtn) == false) {
    console.log(isSelected(colorBtn));
    let columns = columnArray();
    for (i = 0; i < columns.length; i++) {
      let currentDiv = columns[i];
      currentDiv.removeEventListener("mouseenter", brushOn);
    }
    return (colorStatus = "");
  } else if (darkenStatus == "paused" && isSelected(darkenBtn) == false) {
    console.log(isSelected(darkenBtn));
    let columns = columnArray();
    for (i = 0; i < columns.length; i++) {
      let currentDiv = columns[i];
      currentDiv.removeEventListener("mouseenter", darken);
    }
    return (darkenStatus = "");
  } else if (lightenStatus == "paused" && isSelected(lightenBtn) == false) {
    console.log(isSelected(lightenBtn));
    let columns = columnArray();
    for (i = 0; i < columns.length; i++) {
      let currentDiv = columns[i];
      currentDiv.removeEventListener("mouseenter", lighten);
    }
    return (lightenStatus = "");
  }
}

function checkBtn() {
  for (button of btnArray) {
    if (isSelected(button) == true) {
      return button.innerText.toLowerCase();
    }
  }
}

// function clearListeners(){

// }

function pauseRandomBtn(currentTool) {
  if (currentTool == "random" && randomStatus != "paused") {
    pauseRandom();
    // console.log("random status is " + randomStatus);
  } else if (randomStatus == "paused") {
    unPauseRandom();

    console.log("random status is " + randomStatus);
  }
}

function pauseRandom() {
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.removeEventListener("mouseenter", handleRandom);
  }
  return (randomStatus = "paused");
}

function unPauseRandom() {
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.addEventListener("mouseenter", handleRandom);
  }
  return (randomStatus = "un-paused");
}

function pauseColorBtn(currentTool) {
  if (currentTool == "color" && colorStatus != "paused") {
    pauseColor();
    // console.log("color status is " + colorStatus);
  } else if (colorStatus == "paused") {
    unPauseColor();

    console.log("color status is " + colorStatus);
  }
}

function pauseColor() {
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.removeEventListener("mouseenter", brushOn);
  }
  return (colorStatus = "paused");
}

function unPauseColor() {
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.addEventListener("mouseenter", brushOn);
  }
  return (colorStatus = "un-paused");
}

function pauseDarkenBtn(currentTool) {
  if (currentTool == "darken" && darkenStatus != "paused") {
    pauseDarken();
    // console.log("darken status is " + darkenStatus);
  } else if (darkenStatus == "paused") {
    unPauseDarken();

    console.log("darken status is " + darkenStatus);
  }
}

function pauseDarken() {
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.removeEventListener("mouseenter", darken);
  }
  return (darkenStatus = "paused");
}

function unPauseDarken() {
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.addEventListener("mouseenter", darken);
  }
  return (darkenStatus = "un-paused");
}

function pauseLightenBtn(currentTool) {
  if (currentTool == "lighten" && lightenStatus != "paused") {
    pauseLighten();
    // console.log("Lighten status is " + lightenStatus);
  } else if (lightenStatus == "paused") {
    unPauseLighten();

    console.log("Lighten status is " + lightenStatus);
  }
}

function pauseLighten() {
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.removeEventListener("mouseenter", lighten);
  }
  return (lightenStatus = "paused");
}

function unPauseLighten() {
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.addEventListener("mouseenter", lighten);
  }
  return (lightenStatus = "un-paused");
}
startPainting();
