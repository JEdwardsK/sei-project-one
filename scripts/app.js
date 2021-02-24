function init() {
  const testString = 'i am a test string to test this works'

  function randomNumber(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  //* ***************************** Variables ***************************** 
  const splashVideo = document.querySelector('#splashVideo')
  const grid = document.querySelector('.grid')
  //*width and height are attributed values as a percentsge of their containter in CSS
  const width = 20
  const height = 20
  const cellCount = width * height
  const cells = []
  const playerStartingPosition = parseInt((((height - 1) * width) + cellCount) / 2) - 1  
  let playerCurrentPosition = playerStartingPosition
  const playerClass = 'playerCharacter'
  const numberOfEnemies = 60
  const numberOfEnemyRows = 5
  const enemyPerRow = numberOfEnemies / numberOfEnemyRows
  const weaponStartingPosition = playerCurrentPosition
  //let weaponCurrentPosition 
  const weaponClassBolt = 'weaponBolt'
  
  let enemyStartingPosition = []
  //*work out later
  function populateEnemyStart() {
    const startingNumbers = []
    for (let i = 4; i <= (4 + enemyPerRow); i++) {
      startingNumbers.push(i)
    }
    enemyStartingPosition = [...startingNumbers, ...startingNumbers.map(x=> x + height), ...startingNumbers.map(x=> x + (2 * height)), ...startingNumbers.map(x=> x + (height * 3)), ...startingNumbers.map(x=> x + (4 * height)), ...startingNumbers.map(x=> x + (5 * height))]
  }
  populateEnemyStart()
  console.log(enemyStartingPosition)
  let enemyCurrentPosition = enemyStartingPosition
  const enemyWeaponBolt = 'enemyWeaponBolt'
  const weaponFireProbability = 5
  
  const enemyClass = 'enemyCharacter'
  const scoreModifier1 = 10
  
  let scoreCounter = 0
  let lifeCounter = 2
  let currentLevel = 1
  let isPowerupReady = 0
  const powerUpCharge = 4
  
  // game info board variables
  const displayScore = document.querySelector('.displayScore')
  const displayLife = document.querySelector('.displayLife')
  const displayLevel = document.querySelector('.displayLevel')
  const displayPowerBar = document.querySelector('.displayPowerBar')
  const displayeCurrentBonusWeapon = document.querySelector('.displayCurrentBonusWeapon')
  const startButton = document.querySelector('.startButton')
  const resetButton = document.querySelector('.resetButton')
  const powerBar = document.querySelector('.powerBar')
  powerBar.max = powerUpCharge

const splashScreen = document.querySelector('.splashScreen')  

  //! **********************GAME START FUNCTIONS*****************************
  
  function  hideVideo() {
    splashVideo.classList.add('hidden')
    splashScreen.classList.remove('hidden')
    
  }
  function powerupTracker() {

    if (isPowerupReady === powerUpCharge) {
      isPowerupReady = 0
      powerBar.value = 0
      console.log(testString)
    }

  }

  function gameOver(){
    window.alert(`GAME OVER YOU LOSE!!! You failed to defend the base from the alien hordes... your final score is ${scoreCounter}`)
  }
  function gameWin() { 
    window.alert(`GAME OVER, YOU WIN!!! You succesfully repelled the invading forces and live to fight another day... your final score is ${scoreCounter}`)
  }

  function resetGame() {
    window.location.reload()
  }
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
      useWeapon()
    } 
  }
  
  function useWeapon() {
    let weaponCurrentPosition = playerCurrentPosition -= width
    addCharacter(weaponCurrentPosition, weaponClassBolt)
    playerCurrentPosition += width
    const bolt = setInterval(() => {
      removeCharacter(weaponCurrentPosition, weaponClassBolt)
      if (weaponCurrentPosition > width) {
        weaponCurrentPosition -= width
        addCharacter(weaponCurrentPosition, weaponClassBolt)
      } else {
        weaponCurrentPosition = weaponStartingPosition
        clearInterval(bolt)
      }
      cells.forEach(cell => {
        const cellPosition = cells.indexOf(cell)
        const cellClass = cells[cellPosition].classList.value
        if (cellClass === `${enemyClass} ${weaponClassBolt}` || cellClass === `${weaponClassBolt} ${enemyClass}`) {
          removeCharacter(cellPosition,enemyClass)
          removeCharacter(cellPosition,weaponClassBolt)
          //!add explosion for short time then remove
          enemyCurrentPosition = enemyCurrentPosition.filter((item) => item !== weaponCurrentPosition)
          console.log('pre', isPowerupReady)
          scoreCounter += scoreModifier1
          isPowerupReady++
          powerBar.value++
          console.log('post', isPowerupReady)
          powerupTracker()
          enemyRemainingCheck()
          displayScore.innerHTML = `Score ${scoreCounter}`
          clearInterval(bolt)
        }
      })        
    }, 75)
  }
  function addEnemyRow(){
    enemyStartingPosition.forEach(enemy => {
      cells[enemy].classList.add(enemyClass)
    })
  }


  
  // Array of alien indexes
  // On a timer
  // Loop through each of the aliens
  // Remove Class
  // Change position
  // Direction variable
  // Using modulus/maths if ANY of the aliens have hit the edge - .some()?
  // Change direction + Move down
  // Update the position
  // Add Classes Again

  // //let timer = 0
  // // right = 1, left = -1
  function enemyMovementStart() {
    let direction = 1

    const enemyMovement = setInterval(() => {
      //*define edges
      const isOnEdge = cells.some((item, index) => {
        const hasEnemy = item.classList.value === enemyClass
        const isEdge = direction === 1 ? (index % width === (width - 1)) : (index % width === 0)
        if (hasEnemy && isEdge){
          return true 
        }
      })
      //*remove enemy
      enemyCurrentPosition.forEach(eachEnemy => {
        removeCharacter(eachEnemy, enemyClass)
      })
      //*move down if on edge
      if (isOnEdge) {
        console.log('Move down')
        enemyCurrentPosition = enemyCurrentPosition.map((item) => item + 10)
        direction = direction * -1
        console.log(direction)
      //*mutate array left or right
      } else {
        enemyCurrentPosition.forEach((enemy, index) => {
          enemyCurrentPosition[index] = enemy + direction
        })
      }
      //*add enemy back
      enemyCurrentPosition.forEach(eachEnemy => {
        addCharacter(eachEnemy, enemyClass)
      })
      const isOnFloor = cells.some((item, index) => {
        const hasEnemy = item.classList.value === enemyClass
        const isFloor = (height - 1) * width
        if (index >= isFloor && hasEnemy) {
          return true
        }
      })
      if (isOnFloor) {
        gameOver()
        clearInterval(enemyMovement)
      }
    }, 800)
  
    function enemyWeaponFire() {
      /**
       * enemy fires a bolt
       * bolt moves verticaally down
       * if bolt hits player, player loses one life(shield)
       * if player loses all life (life counter === 0, player loses run Game Over)
       * interval boundary is floor
       */
      //const randomCalc = randomNumber(1,weaponFireProbability)
  
      let randomCalc = 1
      console.log(randomCalc)
      enemyCurrentPosition.forEach(enemy => {
        const isEnemyClass = cells[enemy].classList.value === enemyClass
        const enemyWeaponPosition = cells[enemy + width]
        let newEnemyWeaponPosition = enemy + width
        if (randomCalc === 1 && isEnemyClass) {
          addCharacter((enemy + width), enemyWeaponBolt)
          const useBoltWeapon = setInterval(() => {
            removeCharacter(newEnemyWeaponPosition, enemyWeaponBolt)
            if (newEnemyWeaponPosition < ((height - 1) * width)) {
              newEnemyWeaponPosition += width
              addCharacter(newEnemyWeaponPosition, enemyWeaponBolt)
            }
            cells.forEach(cell => {
              const cellPosition = cells.indexOf(cell)
              
              const isEnemyInFront = cells[cellPosition * width].classList.value
              console.log('isEnemyInfront', isEnemyInFront)
              //cells[newEnemyWeaponPosition].classList.value === enemyClass
  
              if (cellValue === `${playerClass} ${enemyWeaponBolt}`) {
                console.log(lifeCounter)
                lifeCounter--
                console.log('life  after hit =>', lifeCounter)
                console.log(cellValue)
                cellValue = playerClass
                console.log('hit')
                console.log(cellValue)
                if (lifeCounter === 0) {
                  gameOver()
                }
              }
            })   
          }, 1000)
        }
      })
    }
    const enemyWeaponeRandomFire = setInterval(() => {
      enemyWeaponFire() 
      
    }, 2000) 
  }

      
  //   enemyCurrentPosition.forEach(enemy => {
  // }
    
  // if(newEnemyWeaponPosition = newEnemyWeaponPosition + width
  // addCharacter(newEnemyWeaponPosition, enemyWeaponBolt)
  // if (newEnemyWeaponPosition >= ((height - 1) * width)) {
  //   removeCharacter(newEnemyWeaponPosition, enemyWeaponBolt)
  //   clearInterval(useBoltWeapon)
  // console.log('is floor', (height - 1) * width)
  
  // // let timer = 0
  // // let enemyPreviousPosition
  // // console.log('test point 1 =>', enemyPreviousPosition)
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
  //enemyRemainingCheck()
  
  function enemyRemainingCheck() {
    const enemyRemainingCheck = setInterval(() => {
      const enemyCounter = enemyCurrentPosition.length
      if (enemyCounter === 0) {
        gameWin()
        clearInterval(enemyRemainingCheck)
      }
    }, 100)
  }
  
  
  
  
  
  displayLife.innerText = lifeCounter === 1 ? `${lifeCounter} life remaining` : `${lifeCounter} lives remaining`
  displayLevel.innerText = `Level: ${currentLevel}`
  displayeCurrentBonusWeapon.innerText = 'placeholder'
  splashVideo.addEventListener('ended',hideVideo)
  resetButton.addEventListener('click', resetGame)
  startButton.addEventListener('click', enemyMovementStart)
  document.addEventListener('keydown', characterMoveset)
}

window.addEventListener('DOMContentLoaded', init)