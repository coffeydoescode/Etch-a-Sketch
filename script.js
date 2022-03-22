const divContainer = document.querySelector(".container");

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
const columnArray = getColumnArray();

function getaRowArray() {
  let totalRows = document.querySelectorAll(".row");
  let currentRowArray = Array.from(totalRows);
  return currentRowArray;
}

const RowArray = getaRowArray();

function gridBuilder(length) {
  rowCount(length);
  const rowArray = Array.from(document.querySelectorAll(".row"));
  for (let i = 0; i < rowArray.length; i++) {
    let currentRow = rowArray[i];
    rowArray[i] = document.querySelector(".row");
    columnCount(length, currentRow);
  }
}
// This function updates the grid size based on the given number

let color = "red";

function colorChange(color) {
  for (let i = 0; i < getColumnArray().length; i++) {
    let currentColumn = getColumnArray()[i];
    currentColumn.addEventListener("mouseenter", () => {
      currentColumn.style.backgroundColor = color;
    });
  }
}
// This function changes the background color of the grid boxes that the user "hovers"

const clearBtn = document.querySelector(".clear-btn");

function cleanSlate() {
  for (let i = 0; i < getColumnArray().length; i++) {
    let currentColumn = getColumnArray()[i];
    currentColumn.style.backgroundColor = "white";
  }
}
// This function sets all canvas columns background colors to white

clearBtn.addEventListener("click", () => {
  cleanSlate();
});

const input = document.querySelector("input");

let inputValue = input.value;
const currentGridSize = document.querySelector("label");
currentGridSize.textContent = inputValue;

function updateLabel() {
  input.addEventListener("input", () => {
    currentGridSize.textContent = input.value;
  });
}
updateLabel();

gridBuilder(6);
colorChange("green");

function gridClear() {
  columns = getColumnArray;
  for (let i = 0; i < columns().length; i++) {
    columns()[i].remove();
  }
  rows = getaRowArray();
  for (let i = 0; i < rows.length; i++) {
    rows[i].remove();
  }
}
// This function removes all rows and colums

gridClear();
gridBuilder(6);
colorChange("green");
