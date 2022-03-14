const div = document.createElement("div");

const divContainer = document.querySelector(".container");

divContainer.appendChild(div);

function divBuilder(numOfDivs) {
  for (let i = 0; i < numOfDivs ** 2; i++) {
    const div = document.createElement("div");
    div.className = "paper";
    divContainer.appendChild(div);
  }
}
divBuilder(16);
