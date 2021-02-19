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

  const weaponStartingPosition = 0
  let weaponCurrentPosition 
  const weaponClassBolt = 'weaponBolt'

  const enemyStartingPosition = 30
  let enemyCurrentPosition = enemyStartingPosition
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
  createGrid()

  function addCharacter(position, characterType) {
    cells[position].classList.add([characterType])
  }

  function removeCharacter(position, character) {
    cells[position].classList.remove(character)
  }

  function characterMoveset(keyPress) {
    const key = keyPress.keyCode
    //character Movement
    if (key === 39 || key === 68 || key === 37 || key === 18) {
      removeCharacter(playerCurrentPosition, playerClass)
      if ((key === 39 || key === 68) && playerCurrentPosition % width !== width - 1) {
        playerCurrentPosition++
        addCharacter(playerCurrentPosition, playerClass)
        console.log(playerCurrentPosition)
      } else if ((key === 37 || key === 18) && playerCurrentPosition % width !== 0) {
        playerCurrentPosition--
        addCharacter(playerCurrentPosition, playerClass)
      } else{
        addCharacter(playerCurrentPosition, playerClass)
      }
    } else if (key === 32){
      weaponCurrentPosition = playerCurrentPosition -= width
      addCharacter(weaponCurrentPosition, weaponClassBolt)
      playerCurrentPosition += width
      let bolt = setInterval(() => {
        removeCharacter(weaponCurrentPosition, weaponClassBolt)
        if (weaponCurrentPosition > 0) {
          weaponCurrentPosition -= width
          addCharacter(weaponCurrentPosition, weaponClassBolt)
        } else {
          clearInterval(bolt)
        }        
      }, 100);
    }
  }


  // let enemyMovement = setInterval(() => {
  //   if (enemyCurrentPosition % width === width - 1) {
  //     let enemyMovementRightAndDown =  setInterval(() => {
  //         removeCharacter(enemyCurrentPosition, enemyClass)
  //         if (enemyCurrentPosition % width !== width - 1){
  //           enemyCurrentPosition++
  //           addCharacter(enemyCurrentPosition, enemyClass)
  //         } else {
  //           enemyCurrentPosition += width
  //           addCharacter(enemyCurrentPosition, enemyClass)
  //           clearInterval(enemyMovementRightAndDown)
  //         }
  //       }, 1000);
  //   } else if (enemyCurrentPosition % width === width) { 
  //     let enemyMovementLeftAndDown = setInterval(() => {
  //       removeCharacter(enemyCurrentPosition, enemyClass)
  //       if (enemyCurrentPosition % width !== 0) {
  //         enemyCurrentPosition--
  //         addCharacter(enemyCurrentPosition, enemyClass)
  //         clearInterval(enemyMovementLeftAndDown)
  //       }
  //       }
  //     }, 1000);
  //   }
  // }, 10000);
  // }

document.addEventListener('keydown', characterMoveset)




















}

window.addEventListener('DOMContentLoaded', init)