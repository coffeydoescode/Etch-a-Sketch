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

function gridSize(length) {
  rowCount(length);
  const rowArray = Array.from(document.querySelectorAll(".row"));
  for (let i = 0; i < rowArray.length; i++) {
    let currentRow = rowArray[i];
    rowArray[i] = document.querySelector(".row");
    columnCount(length, currentRow);
  }
}
// This function updates the grid size based on the given number

gridSize(4);

const columnArray = Array.from(document.querySelectorAll(".column"));

let color = "red";

function colorChange(color) {
  for (let i = 0; i < columnArray.length; i++) {
    let currentColumn = columnArray[i];
    currentColumn.addEventListener("mouseenter", () => {
      currentColumn.style.backgroundColor = color;
    });
  }
}
// This function changes the background color of the grid boxes that the user "hovers"
colorChange("red");

const clearBtn = document.querySelector(".clear-btn");

function cleanSlate() {
  for (let i = 0; i < columnArray.length; i++) {
    let currentColumn = columnArray[i];
    currentColumn.style.backgroundColor = "white";
  }
}
// This function sets all canvas columns background colors to white

clearBtn.addEventListener("click", () => {
  cleanSlate();
});
