function init() {
const testString = 'i am a test string to test this works'
// Variables ***************************** //

const grid = document.querySelector('.grid')
const width = 10
const height = 10
const cellCount = width * height
const cells = []

const playerStartingPosition = 94
let playerCurrentPosition = playerStartingPosition
const playerClass = 'playerCharacter'

const enemyStartingPosition = 34
let enemyCurrentPosition = 0
const enemyClass = 'enemyCharacter'

//! **************GAME BOARD**************************
function createGrid() {
  for (let i = 0; i < cellCount; i++) {
  const cell = document.createElement('div')
  cell.innerText = i
  grid.appendChild(cell)
  cells.push(cell)
  }
addCharacter(playerStartingPosition, playerClass)
addCharacter(enemyStartingPosition, enemyClass)
}
console.log(cells)
createGrid()

function addCharacter(position, characterType) {
  cells[position].classList.add([characterType])
}

function removeCharacter(position, character) {
  cells[position].classList.remove(character)
}


function moveCharacter(keyPress) {
  const key = keyPress.keyCode
  removeCharacter(playerCurrentPosition, playerClass)
  if ((key === 39 || key === 68) && playerCurrentPosition % width !== width - 1) {
//right 
    playerCurrentPosition++
    addCharacter(playerCurrentPosition, playerClass)
    console.log(playerCurrentPosition)
  } else if ((key === 37 || key === 18) && playerCurrentPosition % width !== 0) {
//left
    playerCurrentPosition--
    addCharacter(playerCurrentPosition, playerClass)
  } else{
    addCharacter(playerCurrentPosition, playerClass)
  }

}

let enemyMovement =  setInterval(() => {
    console.log(testString)
  }, 1000);


document.addEventListener('')
document.addEventListener('keydown', moveCharacter)




















}

window.addEventListener('DOMContentLoaded', init)