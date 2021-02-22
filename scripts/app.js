function init() {
  const testString = 'i am a test string to test this works'

  //! ***************************** Variables ***************************** 

  const grid = document.querySelector('.grid')
  const width = 10
  const height = 10
  const cellCount = width * height
  const cells = []

  const playerStartingPosition = 94
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
    addEnemyRow()
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
        cells.forEach(cell => {
          let cellPosition = cells.indexOf(cell)
          const cellClass = cells[cellPosition].classList.value
          if (cellClass === `${enemyClass} ${weaponClassBolt}` || cellClass === `${weaponClassBolt} ${enemyClass}`) {
            removeCharacter(cellPosition,enemyClass)
            removeCharacter(cellPosition,weaponClassBolt)
            //!add explosion for short time then remove
            clearInterval(bolt)
          }
        });        
      }, 75);
    } 
  }
  
  function addEnemyRow(){
    for (let i = (enemyStartingPosition - 2); i <= (enemyStartingPosition + 2); i++) {
      addCharacter(i, enemyClass)
    }
  }
  let groupPositions = []
  cells.forEach(cell => {
    if(cell.classList.value === enemyClass){
      console.log(cells.indexOf(cell))
      groupPositions.push(cells.indexOf(cell))
    }
  });
  console.log(groupPositions)
  console.log(typeof groupPositions[1])



  // for (let i = 0; i < groupPositions.length; i++){
  //   const enemyMovementRightAndDown =  setInterval(() => {
  //     let currentIndex = groupPositions[i] 
  //     removeCharacter(currentIndex, enemyClass)
  //    // cells.forEach(cell => {
  //       // let cellPosition = cells.indexOf(cell)
  //       //const cellClass = cells[cellPosition].classList.value
  //       // //!may cause problems if order change dependant on which class is added last, if so add || to catch reverse 
  //       let cellClass = currentIndex.classList.value
  //       if ( cellClass === `${playerClass} ${enemyClass}`) {
  //         removeCharacter(currentIndex,enemyClass)
  //         removeCharacter(currentIndex,playerClass)
  //         clearInterval(enemyMovementRightAndDown)
  //         window.alert('GAME OVER YOU LOSE')
  //       }
  //   //  });
  //     for (let i = 0; i < groupPositions.length; i++){
  //       removeCharacter(currentIndex, enemyClass)
  //       if (currentIndex % width !== width - 1){
  //         currentIndex++
  //         addCharacter(currentIndex, enemyClass)
  //       } else {
  //         currentIndex += width
  //         addCharacter(currentIndex, enemyClass)
  //         clearInterval(enemyMovementRightAndDown)
  //       }
  //     }
  //   }, 1000);
  // const enemyMovementLeftAndDown = setInterval(() => {
  //   removeCharacter(enemyCurrentPosition, enemyClass)
  //   if (enemyCurrentPosition % width !== 0) {
  //     enemyCurrentPosition--
  //     addCharacter(enemyCurrentPosition, enemyClass)
  //     clearInterval(enemyMovementLeftAndDown)
  //   }
  // }, 1000);
  //}

  
  document.addEventListener('keydown', characterMoveset)




















}

window.addEventListener('DOMContentLoaded', init)