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

  const enemyStartingPosition = [10, 11, 12, 20, 21]
  let enemyCurrentPosition = enemyStartingPosition
  
  const enemyClass = 'enemyCharacter'
  const scoreModifier1 = 10

  let scoreCounter = 1
  let lifeCounter = 1
  let currentLevel = 1

  // // game info board variables
  // const displayScore = document.querySelector('.displayScore')
  // const displayLife = document.querySelector('.displayLife')
  // const displayLevel = document.querySelector('.displayLevel')
  // const displayPowerBar = document.querySelector('.displayPowerBar')
  // const displayeCurrentBonusWeapon = document.querySelector('.displayCurrentBonusWeapon')

  // //game information board innertext
  // displayScore.innerText = `Score ${scoreCounter}`
  // displayLife.innerText = `${lifeCounter} lives remaining`
  // displayLevel.innerText = `Level: ${currentLevel}`
  // displayeCurrentBonusWeapon.innerText = 'placeholder'

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
    } else if ((key === 37 || key === 65) && playerCurrentPosition % width !== 0) {
      playerCurrentPosition--
      addCharacter(playerCurrentPosition, playerClass)
    } else {
      addCharacter(playerCurrentPosition, playerClass)
    } 
  }


  function characterMoveset(keyPress) {
    const key = keyPress.keyCode
    if (key === 39 || key === 68 || key === 37 || key === 65){
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
    enemyStartingPosition.forEach(enemy => {
      cells[enemy].classList.add(enemyClass)
    });
    }
  
  // ! Array of alien indexes
  // ! On a timer
  // ! Loop through each of the aliens
  // ! Remove Class
  // ! Change position
  // ! Direction variable
  // ! Using modulus/maths if ANY of the aliens have hit the edge - .some()?
  // ! Change direction + Move down
  // ! Update the position
  // ! Add Classes Again

  let timer = 0
  // right = 1, left = -1
  let direction = 1

  let enemyMovement = setInterval(() => {
    console.log(testString)

    const isOnEdge = cells.some((item, index) => {
      const hasEnemy = item.classList.value === enemyClass;
      const isEdge = direction === 1 ? (index % width === (width - 1)) : (index % width === 0)
      if (hasEnemy && isEdge){
        return true 
      }
    })
    if (isOnEdge) {
      enemyCurrentPosition = enemyCurrentPosition.map((item) => item + 10)
      direction = - direction
    }

    // index % width === 0

    enemyCurrentPosition.forEach((enemy, index) => {
      const enemyPosition = cells[enemy].classList.value
      if (enemyPosition === enemyClass) {
        // TODO: check if the index is between 0-length
        if (enemyCurrentPosition[index] !== enemyCurrentPosition[index - 1]) {
          removeCharacter(enemy, enemyClass)
        }
        const newEnemyPosition = enemy + direction
        enemyCurrentPosition[index] = newEnemyPosition
        addCharacter(newEnemyPosition, enemyClass)
        console.log(enemyCurrentPosition)
      }
    });
      // if (enemyCurrentPosition[enemyCurrentPosition.length - 1] )
    timer++
    if(timer === 5) {
      // clearInterval(enemyMovement)
    }
  }, 1000);
  
  // let timer = 0
  // let enemyPreviousPosition
  // console.log('test point 1 =>', enemyPreviousPosition)
  // let enemyMovement = setInterval(() => {
  //   console.log('timer counter =>', timer)
  //   cells.forEach(cell => {
  //     if (cell.classList.value === enemyClass) {
  //       console.log(`cell value at start => ${cells.indexOf(cell)}`)
  //       removeCharacter(enemyCurrentPosition, enemyClass)
  //       if (enemyPreviousPosition === undefined){
  //         console.log('test point 2 =>', enemyPreviousPosition)
  //         enemyPreviousPosition = enemyCurrentPosition
  //         enemyCurrentPosition++
  //         addCharacter(enemyCurrentPosition, enemyClass)
  //         console.log('test point 3 =>', enemyPreviousPosition)
  //         console.log('current position =>', enemyCurrentPosition)
  //       } else if (enemyPreviousPosition === (enemyCurrentPosition - 1)) {
  //         console.log('previous minus one(move right)')
  //         if (enemyCurrentPosition % 10 === 0) {
  //           console.log('i fail at mod 10 = 0')
  //           enemyCurrentPosition += 10
  //           addCharacter(enemyCurrentPosition, enemyClass)
  //         } else {
  //           console.log('i fail on the secnd move right')
  //           enemyCurrentPosition++
  //           console.log(enemyCurrentPosition)
  //           addCharacter(enemyCurrentPosition, enemyClass)
  //           console.log('ive run through this line')
  //         }
  //       } else if (enemyPreviousPosition === (enemyCurrentPosition + 1)) {
  //         console.log('previous plus one (move left)')
  //         if (enemyCurrentPosition % width === (width - 1)) {
  //           enemyCurrentPosition += 10
  //           addCharacter(enemyCurrentPosition, enemyClass)
  //         } else {
  //           enemyCurrentPosition--
  //           addCharacter(enemyCurrentPosition, enemyCurrentPosition)
  //         } 
  //       } else if (enemyPreviousPosition === (enemyCurrentPosition += width)) {
  //         console.log('previous plus 10 (move down')
  //         if (enemyCurrentPosition % width === 0) {
  //           enemyCurrentPosition++
  //           addCharacter(enemyCurrentPosition, enemyClass)
  //         } else if (enemyCurrentPosition % width === width - 1) {
  //           enemyCurrentPosition--
  //           addCharacter(enemyCurrentPosition, enemyClass)
  //         }
  //       }
  //     }
  //   }); 
  //   timer === 5 ? clearInterval(enemyMovement) : timer++
  // }, 1000);



  // let groupPositions = []
  // cells.forEach(cell => {
  //   if(cell.classList.value === enemyClass){
  //     console.log(cells.indexOf(cell))
  //     groupPositions.push(cells.indexOf(cell))
  //   }
  // });
  // console.log(groupPositions)
  // console.log(typeof groupPositions[1])



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

  //? **************THOUGHTS ON HOW TO CALC SPEED INCREASE BASED ON ENEMY COUNT***************
  //? OPTION 1 - positive counter
  /* 
  function calculateEnemmySpeed() {
    let enemyCount = 0
    cells.forEach(cell => {
      if (cell.classList === enemyClass){
        enemyCount++
      }  
    });
    console.log(enemyCount)
    if( enemyCount > 10) {
      //increase speed by to level two
    }
    if (enemyCount > 15) {
      //increase speed to level three
    }
    if (enemyCount > 20) {
      // speednincrease to max levvel
    }
  }
  */
  //? p
  //? OPTION 2 - NEGATIVE COUNTER
  document.addEventListener('keydown', characterMoveset)




















}

window.addEventListener('DOMContentLoaded', init)