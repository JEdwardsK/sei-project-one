function init() {

// Variables ***************************** //

const grid = document.querySelector('.grid')
const width = 10
const height = 10
const cellCount = width * height
const cells = []

const playerStartingPosition = 94
let currentCatPosition = 0
//! **************GAME BOARD**************************
function createGrid() {
  for (let i = 0; i < cellCount; i++) {
  const cell = document.createElement('div')
  cell.innerText = i
  grid.appendChild(cell)
  cells.push(cell)
  }
}
createGrid()

function addCharacterToBoard() {
  cells[playerStartingPosition].classlist.add('playerCharacter')
}
addCharacterToBoard()



















}

window.addEventListener('DOMContentLoaded', init)