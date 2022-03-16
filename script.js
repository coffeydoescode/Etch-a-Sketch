const divContainer = document.querySelector(".container");

function createRow() {
  const rowBuild = document.createElement("div");
  rowBuild.className = "row";
  divContainer.append(rowBuild);
}

function rowCount(numbOfRows) {
  for (let i = 0; i < numbOfRows; i++) {
    createRow();
  }
}

function createColumn(selector) {
  const column = document.createElement("div");
  column.className = "column";
  selector.append(column);
}

function columnCount(numbOfColumns, currentRow) {
  for (let i = 0; i < numbOfColumns; i++) {
    createColumn(currentRow);
  }
}

rowCount(30);

const rowArray = Array.from(document.querySelectorAll(".row"));

for (let i = 0; i < rowArray.length; i++) {
  let currentRow = rowArray[i];
  rowArray[i] = document.querySelector(".row");
  columnCount(30, currentRow);
}
