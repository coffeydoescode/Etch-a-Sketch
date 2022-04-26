const divContainer = document.querySelector(".container");

let colorStatus;
let randomStatus = "OFF";
const colorBtn = document.querySelector(".color-btn");
const randomBtn = document.querySelector(".random-btn");

let colorArray = [
  "#09769E",
  "#02182B",
  "#41788C",
  "#1E5A70",
  "#3FB5E0",
  "#2ADFCD",
  "#540903",
  "#f79992",
  "#c9645d",
  "#8c312a",
  "#d92518",
  "#77BA1A",
  "#314517",
  "#4d721d",
  "#4e6929",
  "#314517",
  "#98c45e",
];

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
  colorOn();
}
// This function updates the grid size based on the given number

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
    if (gridLinesInput.checked == false) {
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
    colorStatus = "Color Status = OFF";
  } else if (isSelected(colorBtn) != true) {
    deactivateRandom();
    colorOn();
    colorStatus = "Color Status = ON";
  }
  console.log(colorStatus);
}

function startPainting() {
  colorBtn.addEventListener("click", colorBtnHandler);
  randomBtn.addEventListener("click", randomBtnHandler);
}

const colorChoice = document.getElementById("pick-color");

function handleColor() {
  color = colorChoice.value;
  setColor(color);
}
handleColor();

colorChoice.addEventListener("change", handleColor);

const darkenBtn = document.querySelector(".darken");

darkenBtn.addEventListener("click", () => {
  darkenBtn.classList.toggle("selected");
});

const lightenBtn = document.querySelector(".lighten");

lightenBtn.addEventListener("click", () => {
  lightenBtn.classList.toggle("selected");
});

function getRandomColor(array) {
  let randomIndex = [Math.floor(Math.random() * array.length)];
  let randomColor = array[randomIndex];
  return randomColor;
}

function handleRandom(currentDiv) {
  color = getRandomColor(colorArray);
  currentDiv.target.style.backgroundColor = color;
}

function randomBtnHandler() {
  if (isSelected(colorBtn) == true || isSelected(randomBtn) != true) {
    colorOff();
    activateRandom();
  } else if (isSelected(randomBtn) == true) {
    deactivateRandom();
  }
  console.log(randomStatus);
}

function activateRandom() {
  randomBtn.classList.add("selected");
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.addEventListener("mouseenter", handleRandom);
  }
  randomStatus = "Random Status = ON";
}

function deactivateRandom() {
  randomBtn.classList.remove("selected");
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.removeEventListener("mouseenter", handleRandom);
  }
  randomStatus = "Random Status = OFF";
  setColor(colorChoice.value);
  // colorStatus = "ON";
}

function isSelected(element) {
  if (element.classList.contains("selected")) {
    return true;
  } else {
    return false;
  }
}

startPainting();
