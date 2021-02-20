function init() {
  const testString = 'i am a test string to test this works'

  //! ***************************** Variables ***************************** 

  const grid = document.querySelector('.grid')
  const width = 10
  const height = 10
  const cellCount = width * height
  const cells = []

  const playerStartingPosition = 38
  let playerCurrentPosition = playerStartingPosition
  const playerClass = 'playerCharacter'

  const weaponStartingPosition = playerCurrentPosition
  let weaponCurrentPosition 
  const weaponClassBolt = 'weaponBolt'

  const enemyStartingPosition = 34
  let enemyCurrentPosition = enemyStartingPosition
  
  const enemyClass = 'enemyCharacter'
  const scoreModifier1 = 10

  let scoreCounter = 0

  //! **********************GAME START FUNCTIONS*****************************
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

  function characterMovement(key) {
    removeCharacter(playerCurrentPosition, playerClass)
    if ((key === 39 || key === 68) && playerCurrentPosition % width !== width - 1) {
      playerCurrentPosition++
      addCharacter(playerCurrentPosition, playerClass)
    } else if ((key === 37 || key === 18) && playerCurrentPosition % width !== 0) {
      playerCurrentPosition--
      addCharacter(playerCurrentPosition, playerClass)
    } else{
      addCharacter(playerCurrentPosition, playerClass)
    } 
  }


  function characterMoveset(keyPress) {
    const key = keyPress.keyCode
    if (key === 39 || key === 68 || key === 37 || key === 18){
      characterMovement(key)
    } else if (key === 32){
      weaponCurrentPosition = playerCurrentPosition -= width
      addCharacter(weaponCurrentPosition, weaponClassBolt)
      playerCurrentPosition += width
      let bolt = setInterval(() => {
        removeCharacter(weaponCurrentPosition, weaponClassBolt)
        if (weaponCurrentPosition > width) {
          weaponCurrentPosition -= width
          addCharacter(weaponCurrentPosition, weaponClassBolt)
        } else {
          weaponCurrentPosition = weaponStartingPosition
          clearInterval(bolt)
        }        
      }, 100);
    } 
  }
  
  // function addEnemyRow(){
  //   cells[34, 36].classList.add(enemyClass)
  // }
  // addEnemyRow()
    const enemyMovementRightAndDown =  setInterval(() => {
      cells.forEach(cell => {
        let cellPosition = cells.indexOf(cell)
        const cellClass = cells[cellPosition].classList.value
        //!may cause problems if order change dependant on which class is added last, if so add || to catch reverse 
        if ( cellClass === `${playerClass} ${enemyClass}`) {
          removeCharacter(cellPosition,enemyClass)
          removeCharacter(cellPosition,playerClass)
          //window.alert('GAME OVER YOU LOSE')
        }
        if (cellClass === `${enemyClass} ${weaponClassBolt}` || cellClass === `${weaponClassBolt} ${enemyClass}`) {
          removeCharacter(cellPosition,enemyClass)
          removeCharacter(cellPosition,weaponClassBolt)
          //!add explosion for short time then remove
          scoreCounter += scoreModifier1
          return scoreCounter
        }
      });
      removeCharacter(enemyCurrentPosition, enemyClass)
      if (enemyCurrentPosition % width !== width - 1){
        enemyCurrentPosition++
        addCharacter(enemyCurrentPosition, enemyClass)
      } else {
      enemyCurrentPosition += width
      addCharacter(enemyCurrentPosition, enemyClass)
      clearInterval(enemyMovementRightAndDown)
      }

    }, 1000);
    const enemyMovementLeftAndDown = setInterval(() => {
      removeCharacter(enemyCurrentPosition, enemyClass)
      if (enemyCurrentPosition % width !== 0) {
        enemyCurrentPosition--
        addCharacter(enemyCurrentPosition, enemyClass)
        clearInterval(enemyMovementLeftAndDown)
      }
    }, 1000);

  
document.addEventListener('keydown', characterMoveset)




















}

window.addEventListener('DOMContentLoaded', init)