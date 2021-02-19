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

const addPlayer = addCharacter(playerCurrentPosition, playerClass)
const removePlayer = removeCharacter(playerCurrentPosition, playerClass)

const enemyStartingPosition = 34
let enemyCurrentPosition = enemyStartingPosition
const enemyClass = 'enemyCharacter'

const addEnemy = addCharacter(enemyCurrentPosition, enemyClass)
const removeEnemy = removeCharacter(enemyCurrentPosition, enemyClass)


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
  removePlayer
  if ((key === 39 || key === 68) && playerCurrentPosition % width !== width - 1) {
//right 
    playerCurrentPosition++
    addPlayer
    console.log(playerCurrentPosition)
  } else if ((key === 37 || key === 18) && playerCurrentPosition % width !== 0) {
//left
    playerCurrentPosition--
    addPlayer
  } else{
    addPlayer
  }

}

let enemyMovement =  setInterval(() => {
    removeEnemy
    if (enemyCurrentPosition % width !== width - 1){
    enemyCurrentPosition++
    addEnemy
    } else {
      addEnemy
      clearInterval(enemyMovement)
    }
  }, 1000);
  
  enemyCurrentPosition += 10
  enemyCurrentPosition--
  enemyCurrentPosition += 10

document.addEventListener('')
document.addEventListener('keydown', moveCharacter)




















}

window.addEventListener('DOMContentLoaded', init)