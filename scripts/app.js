function init() {
  const testString = 'i am a test string to test this works'

  function randomNumber(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  //* ***************************** Variables ***************************** 
  //audio variables(
  const soundBoltFire = document.querySelector('.soundBoltFire')
  soundBoltFire
  const soundExplosion = document.querySelector('.soundExplosion')
  const soundMovement1  = document.querySelector('.soundMovement1')
  const soundMovement2  = document.querySelector('.soundMovement2')
  const soundMovement3 = document.querySelector('.soundMovement3')
  const soundMovement4 = document.querySelector('.soundMovement4')
  const soundEnemyKilled = document.querySelector('.soundEnemyKilled')
  const startMenuMusic = document.querySelector('.startMenuMusic')
  const soundUfo1 = document.querySelector('.soundUfo1')
  const soundUfo2 = document.querySelector('.soundUfo2')
  // const soundExplosion = new Audio(src )


  const splashVideo = document.querySelector('.splashVideo')
  const grid = document.querySelector('.grid')
  const width = 20
  const height = 20
  const cellCount = width * height
  const cells = []
  const playerStartingPosition = parseInt((((height - 1) * width) + cellCount) / 2) - 1  
  const playerClass = 'playerCharacter'
  let playerCurrentPosition = playerStartingPosition
  const numberOfEnemies = 60
  const numberOfEnemyRows = 5
  const enemyPerRow = numberOfEnemies / numberOfEnemyRows
  const weaponStartingPosition = playerCurrentPosition
  const weaponClassBolt = 'weaponBolt'
  const weaponClassBomb = 'weaponBomb'
  const explosion = 'explosion'
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
  let enemyCurrentPosition = enemyStartingPosition
  const enemyWeaponBolt = 'enemyWeaponBolt'
  const weaponFireProbability = 5
  
  const enemyClass = 'enemyCharacter'
  const ufoClass = 'ufoCharacter'
  const scoreModifier1 = 10
  
  let scoreCounter = 0
  let lifeCounter = 2
  let currentLevel = 1
  let isPowerupReady = 0
  const powerUpCharge = 4
  
  // splashScreen selectors
  
  const splashScreen = document.querySelector('.splashScreen')  
  const startButtonHome = document.querySelector('.startButtonHome')
  const loadGameButton = document.querySelector('.loadGameButton')
  const highScoreButton = document.querySelector('.highScoreButton')
  const tutorialButton = document.querySelector('.tutorialButton')
  const optionsButton = document.querySelector('.optionsButton')
  

  //gameScreen selectors
  const gameScreen = document.querySelector('.gameScreen')

  const displayScore = document.querySelector('.displayScore p')
  const displayLife = document.querySelector('.displayLife p')
  const displayLevel = document.querySelector('.displayLevel p')

  const powerBar = document.querySelector('.powerBar')
  const displayPowerBar = document.querySelector('.displayPowerBar')
  powerBar.max = powerUpCharge

  const startButton = document.querySelector('.startButton')
  const resetButton = document.querySelector('.resetButton')
  const homeButton = document.querySelector('.homeButton')

  //tutorialScreen selectors
  const tutorialScreen = document.querySelector('.tutorialScreen')
  
  //gameOver and GameWin Selectors
  const gameOverScreen = document.querySelector('.gameOverScreen')
  const gameWinScreen = document.querySelector('.gameWinScreen')
  const submitHighScore = document.querySelector('.submitHighScore')
  
  //highScoreScreen selectors
  const highScoreScreen = document.querySelector('.highScoreScreen')
  
  //optionsScreen selectiors
  const optionsScreen = document.querySelector('.optionsScreen')
  
  //universal selectors
  const returnHomeButton = document.querySelectorAll('.returnHomeButton')
  const allSections = document.querySelectorAll('section')
  const audioMuted = document.querySelector('.audioMuted')
  const audioPlay = document.querySelector('.audioPlay')
  const allAudioElements = document.querySelectorAll('audio')
  
  displayLife.innerText = lifeCounter
  displayLevel.innerText = currentLevel
  //* **********************GAME START FUNCTIONS*****************************
  
  //splashVideo and splashScreen Functions
  function  hideVideo() {
    splashVideo.classList.add('hidden')
    splashScreen.classList.remove('hidden')
    
  }
  function gameStart() {
    gameScreen.classList.remove('hidden')
    splashScreen.classList.add('hidden')
  }
  function loadGame() {
    console.log('i need to load a game')
  }
  function toTutorial() {
    splashScreen.classList.add('hidden')
    tutorialScreen.classList.remove('hidden')
  }
  function toHighscore() {
    splashScreen.classList.add('hidden')
    highScoreScreen.classList.remove('hidden')
  }
  function toOptions() {
    splashScreen.classList.add('hidden')
    optionsScreen.classList.remove('hidden')
  }

  

  //gameOver gameWin functions

  function gameOver(){
    window.alert(`GAME OVER YOU LOSE!!! You failed to defend the base from the alien hordes... your final score is ${scoreCounter}`)
  }
  function gameWin() { 
    window.alert(`GAME OVER, YOU WIN!!! You succesfully repelled the invading forces and live to fight another day... your final score is ${scoreCounter}`)
  }

  function resetGame() {
    window.location.reload()
  }
  

  //gameScreen functions - generate items
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
  function addCharacter(position, characterType) {
    cells[position].classList.add([characterType])
  }
  function removeCharacter(position, character) {
    cells[position].classList.remove(character)
  }
  function addEnemyRow(){
    enemyStartingPosition.forEach(enemy => {
      cells[enemy].classList.add(enemyClass)
    })
  }
  createGrid()

  //gameScreen FUnctions - character functions
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
    console.log(key)
    if (key === 39 || key === 68 || key === 37 || key === 65){
      characterMovement(key)
    } else if (key === 32){
      useWeapon('bolt')
    } else if (key === 80 && (isPowerupReady === powerUpCharge) ) {
      useWeapon('bomb')
    }
  }
  function useWeapon(weapon) {
    if (weapon === 'bolt') {
      let weaponCurrentPosition = playerCurrentPosition -= width
      addCharacter(weaponCurrentPosition, weaponClassBolt)
      soundBoltFire.play()
      playerCurrentPosition += width
      const bolt = setInterval(() => {
        removeCharacter(weaponCurrentPosition, weaponClassBolt)
        if (weaponCurrentPosition > width) {
          weaponCurrentPosition -= width
          addCharacter(weaponCurrentPosition, weaponClassBolt)
          addCharacter(weaponCurrentPosition, weaponClassBolt)
        } else {
          weaponCurrentPosition = weaponStartingPosition
          clearInterval(bolt)
        }
        cells.forEach(cell => {
          const cellPosition = cells.indexOf(cell)
          const cellClass = cells[cellPosition].classList.value
          if (cellClass === `${enemyClass} ${weaponClassBolt}` || cellClass === `${weaponClassBolt} ${enemyClass}`) {
            console.log(cellPosition - 1)
            removeCharacter(cellPosition,enemyClass)
            removeCharacter(cellPosition,weaponClassBolt)
            
            soundEnemyKilled.play()
            addCharacter(cellPosition, explosion)
            enemyCurrentPosition = enemyCurrentPosition.filter((item) => item !== weaponCurrentPosition)
            console.log('pre', isPowerupReady)
            scoreCounter += scoreModifier1
            isPowerupReady++
            powerBar.value++
            console.log('post', isPowerupReady)
            powerupTracker()
            enemyRemainingCheck()
            displayScore.innerHTML = scoreCounter
            clearInterval(bolt)
          } else if (cellClass === `${weaponClassBolt} ${enemyWeaponBolt}` || cellClass === `${enemyWeaponBolt} ${weaponClassBolt}`) {
            removeCharacter(cellPosition,enemyClass)
            removeCharacter(cellPosition,weaponClassBolt)
            soundExplosion.play()
          }
        })        
      }, 75)
    } else if (weapon === 'bomb') {
      let weaponCurrentPosition = playerCurrentPosition -= width
      addCharacter(weaponCurrentPosition, weaponClassBomb)
      soundBoltFire.play()
      playerCurrentPosition += width
      const Bomb = setInterval(() => {
        removeCharacter(weaponCurrentPosition, weaponClassBomb)
        if (weaponCurrentPosition > width) {
          weaponCurrentPosition -= width
          addCharacter(weaponCurrentPosition, weaponClassBomb)
        } else {
          weaponCurrentPosition = weaponStartingPosition
          clearInterval(Bomb)
        }
        cells.forEach(cell => {
          const cellPosition = cells.indexOf(cell)
          const cellClass = cells[cellPosition].classList.value
          if (cellClass === `${enemyClass} ${weaponClassBomb}` || cellClass === `${weaponClassBomb} ${enemyClass}`) {
            removeCharacter(cellPosition,enemyClass)
            removeCharacter(cellPosition,weaponClassBomb)
            soundEnemyKilled.play()
            addCharacter(cellPosition, explosion)
            enemyCurrentPosition = enemyCurrentPosition.filter((item) => item !== weaponCurrentPosition)
            console.log('pre', isPowerupReady)
            scoreCounter += scoreModifier1
            isPowerupReady++
            powerBar.value++
            console.log('post', isPowerupReady)
            powerupTracker()
            enemyRemainingCheck()
            displayScore.innerHTML = scoreCounter
            clearInterval(Bomb)
          } else if (cellClass === `${weaponClassBomb} ${enemyWeaponBolt}` || cellClass === `${enemyWeaponBolt} ${weaponClassBomb}`) {
            removeCharacter(cellPosition,enemyClass)
            removeCharacter(cellPosition,weaponClassBomb)
            soundExplosion.play()
          }
        })        
      }, 75)
    }
  }
  function powerupTracker() {

    if (isPowerupReady === powerUpCharge + 1) {
      isPowerupReady = 0
      powerBar.value = 0
      console.log(testString)
    }

  }
  const removeExplosions = setInterval(() => {
    cells.forEach(cell => {
      let cellPosition = cells.indexOf(cell)
      if (cell.classList.value === explosion) {
        removeCharacter(cellPosition, explosion)
      }
    })
  }, 1000)
  //gameScreen functions - enemy functions
  function enemyMovementStart() {
    ufoAppears()
    let direction = 1

    let soundCounter = 0
    const enemyMovement = setInterval(() => {
      soundCounter++
      if (soundCounter === 1){
        soundMovement1.play()
      } else if (soundCounter === 2) {
        soundMovement2.play()
      } else if (soundCounter === 3) {
        soundMovement3.play()
      } else if (soundCounter === 4) {
        soundMovement4.play()
        soundCounter = 0
      }
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
        enemyCurrentPosition = enemyCurrentPosition.map((item) => item + height )
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
      if (isOnFloor ) {
        gameOver()
        clearInterval(enemyMovement)
      }
    }, 1000)
  
    // function enemyWeaponFire() {
    //   /**
    //    * enemy fires a bolt
    //    * bolt moves verticaally down
    //    * if bolt hits player, player loses one life(shield)
    //    * if player loses all life (life counter === 0, player loses run Game Over)
    //    * interval boundary is floor
    //    */
    //   //const randomCalc = randomNumber(1,weaponFireProbability)
  
    //   let randomCalc = 1
    //   console.log(randomCalc)
    //   let randomEnemyToFire = []
    //   enemyCurrentPosition.forEach(enemy => {
    //     console.log(enemy + width)
    //     const isEnemyClass = cells[enemy].classList.value === enemyClass
    //     const isNoEnemyinFront = cells[enemy + width].classList.value !== enemyClass
    //     const enemyWeaponPosition = cells[enemy + width]
    //     if (isEnemyClass && isNoEnemyinFront) {
    //       randomEnemyToFire.push()
    //     }
    //   })
    //   //const randomEnemyCalc = randomNumber(0,randomEnemyToFire.length)
    //   let randomEnemyCalc = randomEnemyToFire[2]
    //   let newEnemyWeaponPosition = randomEnemyCalc + width
    //   addCharacter((randomEnemyCalc + width), enemyWeaponBolt)
    //   const useBoltWeapon = setInterval(() => {
    //     removeCharacter(newEnemyWeaponPosition, enemyWeaponBolt)
    //     if (newEnemyWeaponPosition < ((height - 1) * width)) {
    //       newEnemyWeaponPosition += width
    //       addCharacter(newEnemyWeaponPosition, enemyWeaponBolt)
    //     }
    //     cells.forEach(cell => {
    //       const cellPosition = cells.indexOf(cell)
    //       const isEnemyInFront = cells[cellPosition * width].classList.value
    //       let cellClass = cells[cellPosition].classList.value
    //       console.log('isEnemyInfront', isEnemyInFront)
    //       //cells[newEnemyWeaponPosition].classList.value === enemyClass
    //       if (cellClass === `${playerClass} ${enemyWeaponBolt}`) {
    //         console.log(lifeCounter)
    //         lifeCounter--
    //         displayLife.innerText = lifeCounter === 1 ? `${lifeCounter} life remaining` : `${lifeCounter} lives remaining`
    //         console.log('life  after hit =>', lifeCounter)
    //         console.log(cellClass)
    //         cellClass = playerClass
    //         console.log('hit')
    //         console.log(cellClass)
    //         if (lifeCounter === 0) {
    //           gameOver()
    //         }
    //       }
    //     })   
    //   }, 1000)
    // }
    const enemyWeaponRandomFire = setInterval(() => {
      enemyWeaponFire() 
      
    }, 2000) 
  }

  function enemyRemainingCheck() {
    const enemyRemainingCheck = setInterval(() => {
      const enemyCounter = enemyCurrentPosition.length

      if (enemyCounter === 0) {
        gameWin()
        clearInterval(enemyRemainingCheck)
      }
    }, 100)
  }

  function increaseSpeed() {
    const speedFraction = 1000 / enemyStartingPosition.length
    let speed = 1000
    let compareLength = enemyStartingPosition.length
    const reduceSpeedNumber = setInterval(() => {
      if ((enemyCurrentPosition.length - 1) === compareLength) {
        speed -= speedFraction
        compareLength = enemyCurrentPosition.length
        console.log('speed is now', speed)
      }

      if (speed === 0) {
        clearInterval(reduceSpeedNumber)
      }
    }, 100)

  }
  increaseSpeed()

  function ufoAppears() {
    const timerForAppearing = setInterval(() => {
      ufoSoundCounter++
      if (ufoSoundCounter === 1){
        soundUfo1.play()
      } else if (ufoSoundCounter === 2) {
        soundUfo2.play()
        ufoSoundCounter = 0
      }
      console.log(testString)
      const ufoStartingPosition = width - 1
      let ufoCurrentPosition = ufoStartingPosition
      addCharacter(ufoStartingPosition, ufoClass)
      const ufoSpeed = setInterval(() => {
        removeCharacter(ufoCurrentPosition, ufoClass)
        ufoCurrentPosition--
        addCharacter(ufoCurrentPosition, ufoClass)
        if (ufoCurrentPosition === 0) {
          removeCharacter(ufoStartingPosition, ufoClass)
          clearInterval(ufoSpeed)
        }
      }, 300);
      
    }, 12000);
  }
  //universal functions
  function returnHome() {
    allSections.forEach(element => {
      element.classList.add('hidden')
    })
    splashScreen.classList.remove('hidden')

  }

  function playStartMusic() {
    const splashIsHidden = splashScreen.classLlist.contains('hidden')
    if (!splashIsHidden){
      startMenuMusic.play()
    }
    if (splashIsHidden){
      startMenuMusic.pause()
    }
  }

  function controlAudio(event) {
    console.log(event.target.classList)
    const eventButton = event.target.classList
    if (eventButton === 'audioMuted'){
      allAudioElements.forEach(audio => {
        audio = audio.muted = true
      });
    } else if (eventButton === 'audioPlay') {
      allAudioElements.forEach(audio => {
        audio.muted = false
      });

    }

  }
  let ufoSoundCounter = 0 



  
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
  
  //splashScreen event listeners
  //splashVideo.addEventListener('ended',hideVideo)
  startButtonHome.addEventListener('click', gameStart)
  loadGameButton.addEventListener('click',loadGame)
  tutorialButton.addEventListener('click', toTutorial)
  optionsButton.addEventListener('click', toOptions)


  
  //gameScreen event listeners
  resetButton.addEventListener('click', resetGame)
  startButton.addEventListener('click', enemyMovementStart)
  document.addEventListener('keydown', characterMoveset)

  //univeral event listeners
  returnHomeButton.forEach(element => {
    element.addEventListener('click', returnHome)
  })
  audioMuted.addEventListener('click', controlAudio)
  audioPlay.addEventListener('click', controlAudio)




}

window.addEventListener('DOMContentLoaded', init)



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
