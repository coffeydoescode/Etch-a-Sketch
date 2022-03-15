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

rowCount(10);
const hello = document.querySelectorAll(".row");

const column = document.createElement("div");

column.className = "column";

divContainer.firstChild.append(column);
