const divContainer = document.querySelector(".container");

let currentStatus;
const brush = document.querySelector(".brush-container");
const yellow = "#f6bd60";
const offWhite = "#f2f4f3";

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
  listenUp();
}
// This function updates the grid size based on the given number

let setColor = function (newColor) {
  color = newColor;
};
setColor("#F6BD60");
// Default Color
// This function changes the background color of the grid boxes that the user "hovers"

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

const input = document.querySelector("input");

let inputValue = input.value;
const currentGridSize = document.querySelector("label");
currentGridSize.textContent = `${inputValue} X ${inputValue}`;

function updateLabel() {
  input.addEventListener("input", () => {
    currentGridSize.textContent = `${input.value} X ${input.value}`;
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
  input.addEventListener("change", () => {
    newInputValue = input.value;
    gridBuilder(input.value);
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
const defaultGrid = input.value;
gridBuilder(defaultGrid);
setColor(color);
// setColor("white");

const gridLinesInput = document.getElementById("grid-lines");

gridLinesInput.addEventListener("click", () => {
  if (gridLinesInput.checked) {
    columns = columnArray();
    columns.forEach((element) => {
      element.classList.add("grid-lines");
    });
  } else {
    columns = columnArray();
    columns.forEach((element) => {
      element.classList.remove("grid-lines");
    });
  }
});

const body = document.querySelector("body");

function brushOn(currentDiv) {
  currentDiv.target.style.backgroundColor = color;
}

function listenUp() {
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.addEventListener("mouseenter", brushOn);
  }
  currentStatus = "ON";
  brush.style.backgroundColor = yellow;
}

function colorOff() {
  let columns = columnArray();
  for (i = 0; i < columns.length; i++) {
    let currentDiv = columns[i];
    currentDiv.removeEventListener("mouseenter", brushOn);
  }
  currentStatus = "OFF";
  brush.style.backgroundColor = offWhite;
}

function brushHandler() {
  if (currentStatus == "ON") {
    colorOff();
    console.log(currentStatus);
  } else if (currentStatus == "OFF") {
    listenUp();
    console.log(currentStatus);
  }
}
function startPainting() {
  divContainer.addEventListener("click", brushHandler);
  brush.addEventListener("click", brushHandler);
}

startPainting();
