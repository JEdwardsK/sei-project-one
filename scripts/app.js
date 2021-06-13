const init = () => {
  //#region  //* DOCUMENT SELECTORS
  //#region  //* GAME SCREEN SELECTORS
  const gameScreen = document.querySelector('.gameScreen')
  const grid = document.querySelector('.grid')
  const bonusDisplay = document.querySelector('.displayCurrentBonusWeapon p')
  const powerBar = document.querySelector('.powerBar')
  const displayPowerBar = document.querySelector('.displayPowerBar')
  const powerBarH3 = document.querySelector('.displayPowerBar h3')
  const resetButton = document.querySelector('.resetButton')
  const homeButton = document.querySelector('.homeButton')
  const startButton = document.querySelector('.startButton')
  const displayScore = document.querySelector('.displayScore p')
  const displayLife = document.querySelector('.displayLife p')
  const displayLevel = document.querySelector('.displayLevel p')
  //#endregion
  //#region //* HOMESCREEN SELECTORS
  const startPage = document.querySelector('.startPage')
  const arcadeVideo = document.querySelector('.arcadeVideo')
  const splashScreen = document.querySelector('.splashScreen')
  const startButtonHome = document.querySelector('.startButtonHome')
  const loadGameButton = document.querySelector('.loadGameButton')
  const highScoreButton = document.querySelector('.highScoreButton')
  const tutorialButton = document.querySelector('.tutorialButton')
  const optionsButton = document.querySelector('.optionsButton')
  //#endregion
  //#region //* TUTORIAL, GAMEOVER/WIN, OPTIONS SELECTORS
  const tutorialScreen = document.querySelector('.tutorialScreen')
  const gameOverScreen = document.querySelector('.gameOverScreen')
  const gameWinScreen = document.querySelector('.gameWinScreen')
  const submitHighScore = document.querySelector('.submitHighScore')
  const finalScore = document.querySelector('.finalScore')
  const optionsScreen = document.querySelector('.optionsScreen')
  const highScoreScreen = document.querySelector('.highScoreScreen')

  //#endregion
  //#region //* SOUND SELECTORS
  // const splashVideo = document.querySelector('.splashVideo')
  const soundBoltFire = document.querySelector('.soundBoltFire')
  const soundExplosion = document.querySelector('.soundExplosion')
  const soundMovement1 = document.querySelector('.soundMovement1')
  const soundMovement2 = document.querySelector('.soundMovement2')
  const soundMovement3 = document.querySelector('.soundMovement3')
  const soundMovement4 = document.querySelector('.soundMovement4')
  const soundEnemyKilled = document.querySelector('.soundEnemyKilled')
  const soundUfo1 = document.querySelector('.soundUfo1')
  const soundUfo2 = document.querySelector('.soundUfo2')

  //#endregion
  //#region //* UNIVERSAL SELECTORS
  const returnHomeButton = document.querySelectorAll('.returnHomeButton')
  const navigationButton = document.querySelectorAll('.navigationButton')
  const allSections = document.querySelectorAll('section')
  const allAudioElements = document.querySelectorAll('audio')
  //#endregion
  //#endregion

  //#region //* VARIABLES

  //* grid variables
  // adjustable variables. height may break due to css styling percentages for `.cell div`
  const height = 20
  let lifeCounter = 2
  let currentLevel = 1
  const powerUpCharge = 4
  const scoreModifier1 = 10

  // do not adjust, the empty arrays will have numbers pushed into them in later functions
  const width = height
  const cellCount = height * width
  const cells = []
  const leftBoundary = []
  const rightBoundary = [cellCount - 1]
  const bottomBoundary = []
  const topBoundary = []
  let scoreCounter = 0
  let isPowerUpReady = 0
  displayLife.innerText = lifeCounter
  displayLevel.innerText = currentLevel
  powerBar.max = powerUpCharge
  let gameEnd = false

  //* player variables
  // the starting player position should always be in the centre of the bottom row on the game board.
  const playerStartingPosition = 390
  let playerCurrentPosition = playerStartingPosition

  //* enemy variables
  // can be amended to increase the number of enemies in a row, and the number of rows in the starting formation.
  const enemyFirstRow = []
  const numberOfRows = 5

  const numberOfEnemies = 60
  const enemyPerRow = numberOfEnemies / numberOfRows

  // do not adjust, the `enemyPosition` variable will be populated by a function based on the `numberOfRowsFunction`
  let enemyPosition = []

  // className variables, used for updating element classLists, do not adjust.
  const classPlayer = 'playerCharacter'
  const classUFO = 'ufoCharacter'
  const classBolt = 'weaponBolt'
  const classEnemy = 'enemyCharacter'
  const classEnemyBolt = 'enemyWeaponBolt'
  const classCollision = 'explosion'
  const classBomb = 'weaponBomb'
  //#endregion

  //#region //* FUNCTION DECLARATIONS

  /**
   * Returns a random number between the parameters `min` and `max`, inclusive
   * @param {number} min
   * @param {number} max
   * @returns number
   */
  const randomNumber = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  //! not in use yet, trying to automate the placement of centred enemy formation based on defined number of enemies in enemyNumber variable
  function populateEnemyStart() {
    const startingNumbers = []

    enemyStartingPosition = [
      ...startingNumbers,
      ...startingNumbers.map((x) => x + height),
      ...startingNumbers.map((x) => x + 2 * height),
      ...startingNumbers.map((x) => x + height * 3),
      ...startingNumbers.map((x) => x + 4 * height),
      ...startingNumbers.map((x) => x + 5 * height),
    ]
  }

  /**
   * Generates the grid and defines its boundaries, updating the `leftBoundary`, `rightBoundary`, `bottomBoundary` and `topBoundary` variables.
   */
  const createGameBoard = () => {
    // generate the grid. assigns child div elements to the grid element, based on the `cellCount` variable
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    //define boundaries
    for (let i = 0; i < cellCount; i += height) {
      leftBoundary.push(i)
      if (i - 1 > 0) rightBoundary.push(i - 1)
    }
    for (let i = cellCount - 1; i >= width * (height - 1); i--) {
      bottomBoundary.push(i)
    }
    for (let i = 0; i < width; i++) {
      topBoundary.push(i)
    }
  }

  /**
   * adds the starting positions for all of the characters. Assigns the `playerClass` to the cell at `playerStartingPosition`. Updates `enemyPosition` to include extra rows based on the `numberOfEnemyRows`
   * @param {number} numberOfEnemyRows
   */
  const generateStartingPositions = (numberOfEnemyRows) => {
    cells[playerStartingPosition].classList.add(classPlayer)
    //#region //! DELETE AFTER TESTING - assigns visual class to check right cells are selected for each boundary, not required after testing
    leftBoundary.forEach((position) => {
      cells[position].classList.add('boundary')
    })
    rightBoundary.forEach((position) => {
      cells[position].classList.add('boundary')
    })
    topBoundary.forEach((position) => {
      cells[position].classList.add('bottom')
    })
    //#endregion
    // add enemy rows and assign class

    for (let i = 4; i <= 4 + enemyPerRow; i++) {
      enemyFirstRow.push(i)
    }
    const empty = []
    for (let i = 1; i <= numberOfEnemyRows; i++) {
      const row = enemyFirstRow.map((cell) => cell + i * 20)
      empty.push(row)
    }
    enemyPosition = empty.flat()
    enemyPosition.forEach((enemy) => {
      cells[enemy].classList.add(classEnemy)
    })
  }

  /**
   * This function takes a string and either adds or removes the string from the classList of the cell div at the given position
   * @param {string} character the class name
   * @param {number} position the cell position
   */
  const changeCellClasslist = (character, position) => {
    if (
      character === classCollision &&
      cells[position].classList.contains(classEnemy)
    ) {
      cells[position].classList = classCollision
    } else {
      cells[position].classList.contains(character)
        ? cells[position].classList.remove(character)
        : cells[position].classList.add(character)
    }
  }

  /**
   * This function listens for key inputs from the user and takes a particular action based on the `keyCode` value. Handles player movement and weapon fire
   */
  const playerMovement = (key) => {
    const isLeftBoundary = playerCurrentPosition % width === width - 1
    const isRightBoundary = playerCurrentPosition % width === 0
    // left arrow or 'a'
    if (key === 39 || (key === 68 && !isLeftBoundary)) {
      changeCellClasslist(classPlayer, playerCurrentPosition)
      playerCurrentPosition += 1
      changeCellClasslist(classPlayer, playerCurrentPosition)
      // right arrow or 'd'
    } else if (key === 37 || (key === 65 && !isRightBoundary)) {
      changeCellClasslist(classPlayer, playerCurrentPosition)
      playerCurrentPosition -= 1
      changeCellClasslist(classPlayer, playerCurrentPosition)
    }
  }

  /**
   * runs weapon interval action based on `weapon` parameter
   * @param {string} weaponType player weapon type, either `'bolt'`, `'bomb'`, `'enemy'`
   */
  const useWeapon = (weaponType) => {
    let weaponMovement = -width
    let weaponStartingPosition = playerCurrentPosition - width
    let weaponCurrentPosition = weaponStartingPosition
    let weapon = classBolt
    let sound = soundBoltFire
    if (weaponType === 'bomb') {
      weapon = classBomb
      sound = soundExplosion
    }
    changeCellClasslist(weapon, weaponCurrentPosition)
    sound.play()
    const shoot = setInterval(() => {
      changeCellClasslist(weapon, weaponCurrentPosition)
      weaponCurrentPosition += weaponMovement
      if (weaponCurrentPosition < width - 1) {
        clearInterval(shoot)
      } else {
        changeCellClasslist(weapon, weaponCurrentPosition)
      }
      if (isCollision(weaponCurrentPosition, weaponType)) {
        clearInterval(shoot)
        scoreCounter += scoreModifier1
        if (weaponType === 'bolt') {
          isPowerUpReady++
          powerBar.value++
        }
        powerUpTracker()
        // enemyRemainingCheck()
        displayScore.innerHTML = scoreCounter
      }
    }, 100)
  }
  /** Updates display to indicate whether power up is ready */
  const powerUpTracker = () => {
    if (isPowerUpReady === powerUpCharge) {
      bonusDisplay.innerText = 'BOMB'
      powerBarH3.innerText = 'READY TO FIRE'
    }
  }
  /**checks whether all enemies  */
  const enemyRemainingCheck = () => {
    console.log('enemycheck', enemyPosition.length)
    if (enemyPosition.length === 0) {
      gameOver('win')
      clearInterval(enemyRemainingCheck)
    }
    // const enemyRemainingCheck = setInterval(() => {
    //   const enemyCounter = enemyCurrentPosition.length

    //   if (enemyCounter === 0) {
    //     gameEnd('win')
    //     clearInterval(enemyRemainingCheck)
    //   }
    // }, 100)
  }
  /**
   * takes a cell position and determines whether there has been a collision at the given at that cell. Additionally takes an optional `weaponType` parameter. If the weapon type is `'bomb'`, the collision will result in an area explosion. If null, will default to single enemy collision
   * @param {number} position cell position
   * @param {string} collisionType weapon type, `'bomb'` if null will default to single enemy collision
   * @returns {boolean} if true, a collision occurred
   */
  const isCollision = (position, collisionType) => {
    const enemy = cells[position].classList.contains(classEnemy)
    const weapon =
      cells[position].classList.contains(classBolt) ||
      cells[position].classList.contains(classBomb)
    const player = cells[position].classList.contains(classPlayer)
    const bombArea = [
      position - 1 - width,
      position - width,
      position - width + 1,
      position - 1,
      position,
      position + 1,
    ]

    if (enemy && weapon) {
      soundEnemyKilled.play()
      switch (collisionType) {
        case 'bomb':
          bombArea.forEach((position) => {
            changeCellClasslist(classCollision, position)
          })
          break
        default:
          changeCellClasslist(classCollision, position)
          break
      }
      return true
    } else return false
  }

  /**
   * Handles enemy movement and weapon action. Enemy movement is based on an interval of one second
   */
  const enemyMovement = () => {
    let soundCounter = 0
    let direction = 1
    let isAlreadyInBoundary = false
    const allMove = (movement) => {
      enemyPosition.forEach((enemy) => {
        changeCellClasslist(classEnemy, enemy)
      })

      enemyPosition = enemyPosition.map((enemy) => (enemy += movement))

      enemyPosition.forEach((enemy) => {
        changeCellClasslist(classEnemy, enemy)
      })
    }
    const movement = setInterval(() => {
      gameEnd && clearInterval(movement)
      soundCounter++
      if (soundCounter === 1) {
        soundMovement1.play()
      } else if (soundCounter === 2) {
        soundMovement2.play()
      } else if (soundCounter === 3) {
        soundMovement3.play()
      } else if (soundCounter === 4) {
        soundMovement4.play()
        soundCounter = 0
      }
      // enemyWeaponFire(enemyPosition)
      const isInBoundary =
        enemyPosition.some((item) => rightBoundary.includes(item)) ||
        enemyPosition.some((item) => leftBoundary.includes(item))
      const isFloor = enemyPosition.some((item) =>
        bottomBoundary.includes(item)
      )
      enemyPosition = enemyPosition.filter(
        (position) => !cells[position].classList.contains(classCollision)
      )
      enemyRemainingCheck()
      cells.forEach((cell) => {
        cell.classList.remove(classCollision)
      })
      if (isInBoundary && !isAlreadyInBoundary) {
        console.log(isAlreadyInBoundary)
        direction = direction * -1
        allMove(height)
        isAlreadyInBoundary = true
        console.log(isAlreadyInBoundary)
      } else {
        allMove(direction)
        isAlreadyInBoundary = false
      }
      if (isFloor) {
        window.alert('gameover')
        clearInterval(movement)
      }
    }, 1000)
  }

  /**
   * Assigns the class hidden to all screens, then removes the class hidden from the Element `screen`. The screen is selected based on the button's value.
   * @param {Element} display the screen to display
   */
  const toggleScreen = (event) => {
    const { value } = event.target
    allSections.forEach((section) => {
      if (!section.classList.contains('hidden')) {
        section.classList.add('hidden')
      }
    })
    const screen = document.querySelector(value)
    screen.classList.remove('hidden')
  }
  /**
   * Handles end of game, navigates to Game Win/Over screen based on `state` parameter.
   * @param {string} state either `'win'` or `'lose'`
   */
  const gameOver = (state) => {
    gameEnd = true
    if (state === 'win') toggleScreen(gameWinScreen)
    else if (state === 'lose') toggleScreen(gameOverScreen)
    finalScore.innerText = `Your final score is ${scoreCounter}`
  }
  /**
   * Takes an array `enemyPosition` and randomly fires weapon from on of the positions from the array.
   * @param {number[]} enemyPosition array of enemy cell positions
   */
  const enemyWeaponFire = (enemyPosition) => {
    const number = randomNumber(0, enemyPosition.length - 1)
    console.log('random number', number)
    let weaponCurrentPosition = enemyPosition[number]
    const shoot = setInterval(() => {
      changeCellClasslist(classEnemyBolt, weaponCurrentPosition)
      weaponCurrentPosition += width
      if (weaponCurrentPosition >= cellCount) {
        clearInterval(shoot)
      } else {
        changeCellClasslist(classEnemyBolt, weaponCurrentPosition)
      }
      // if (isCollision(weaponCurrentPosition, weaponType)) {
      //   clearInterval(shoot)
      // }
    }, 700)
  }
  //#endregion

  //#region //* FUNCTIONS CALLED BY EVENT LISTENERS
  /**
   * Loads the gameboard. runs the functions `createGameBoard` and
    `generateStartingPositions`
   */
  const gameLoad = () => {
    createGameBoard()
    generateStartingPositions(numberOfRows)
  }
  const resetGame = () => {
    window.location.reload()
  }
  /**
   * Start the game. Calls the enemy functions
   */
  const gameStart = () => {
    enemyMovement()
    // enemyWeaponFire()
    startButton.disabled = true
  }
  gameLoad()

  const playerAction = (event) => {
    console.log(event.keyCode)
    const { keyCode: key } = event
    const movementKeys = [37, 39, 65, 68]

    if (movementKeys.includes(key)) playerMovement(key)
    else if (key === 32) useWeapon('bolt')
    else if (key === 80 && isPowerUpReady >= powerUpCharge) {
      useWeapon('bomb')
      isPowerUpReady = 0
      powerBar.value = 0
      bonusDisplay.innerText = ' '
      powerBarH3.innerText = 'POWERING UP...'
    }
  }
  //#endregion

  //#region //* EVENT LISTENERS
  document.addEventListener('keydown', playerAction)
  startButton.addEventListener('click', gameStart)
  navigationButton.forEach((button) => {
    button.addEventListener('click', toggleScreen)
  })
  //#endregion

  //loadGameButton.addEventListener('click',loadGame)

  //gameScreen event listeners
  // resetButton.addEventListener('click', resetGame)

  //#region //! splash screen functions, need to amend, rewritten into new function toggleScreen, delete after testing
  // function hideVideo() {
  //   splashVideo.classList.add('hidden')
  //   splashScreen.classList.remove('hidden')
  // }
  // function gameStart() {
  //   gameScreen.classList.remove('hidden')
  //   splashScreen.classList.add('hidden')
  // }
  // function loadGame() {}
  // function toTutorial() {
  //   splashScreen.classList.add('hidden')
  //   tutorialScreen.classList.remove('hidden')
  // }
  // function toHighscore() {
  //   splashScreen.classList.add('hidden')
  //   highScoreScreen.classList.remove('hidden')
  // }
  // function toOptions() {
  //   splashScreen.classList.add('hidden')
  //   optionsScreen.classList.remove('hidden')
  // }

  // function removeStartPage() {
  //   startPage.classList.add('hidden')
  //   arcadeVideo.classList.remove('hidden')
  //   splashVideo.play()
  // }
  //#endregion

  //#region //! old code not needed, delete after testing
  // function gameRestart() {
  //   splashScreen.classList.add('hidden')
  //   gameOverScreen.classList.add('hidden')
  //   gameScreen.classList.remove('hidden')
  // }

  // //gameScreen functions - generate items
  // function createGrid() {
  //   for (let i = 0; i < cellCount; i++) {
  //     const cell = document.createElement('div')
  //     // cell.innerText = i
  //     grid.appendChild(cell)
  //     cells.push(cell)
  //   }
  //   addCharacter(playerStartingPosition, playerClass)
  //   addEnemyRow()
  // }
  // function addCharacter(position, characterType) {
  //   cells[position].classList.add([characterType])
  // }
  // function removeCharacter(position, character) {
  //   cells[position].classList.remove(character)
  // }
  // function addEnemyRow() {
  //   enemyStartingPosition.forEach((enemy) => {
  //     cells[enemy].classList.add(enemyClass)
  //   })
  // }
  // createGrid()

  // //gameScreen FUnctions - character functions
  // function characterMovement(key) {
  //   if (stopGame) return

  //   removeCharacter(playerCurrentPosition, playerClass)
  //   if (
  //     (key === 39 || key === 68) &&
  //     playerCurrentPosition % width !== width - 2
  //   ) {
  //     playerCurrentPosition++
  //     addCharacter(playerCurrentPosition, playerClass)
  //   } else if (
  //     (key === 37 || key === 65) &&
  //     playerCurrentPosition % width !== 1
  //   ) {
  //     playerCurrentPosition--
  //     addCharacter(playerCurrentPosition, playerClass)
  //   } else {
  //     addCharacter(playerCurrentPosition, playerClass)
  //   }
  // }
  // function characterMoveset(keyPress) {
  //   if (stopGame) return

  //   const key = keyPress.keyCode
  //   console.log(key)
  //   if (key === 39 || key === 68 || key === 37 || key === 65) {
  //     characterMovement(key)
  //   } else if (key === 32) {
  //     useWeapon('bolt')
  //   } else if (key === 80 && isPowerUpReady >= powerUpCharge) {
  //     useWeapon('bomb')
  //     isPowerUpReady = 0
  //     powerBar.value = 0
  //     bonusDisplay.innerText = ' '
  //     powerBarH3.innerText = 'POWERING UP...'

  //     //! } else if (key === 13) {
  //     //!   removeStartPage()
  //   }
  // }
  // function useWeapon(weapon) {
  //   if (stopGame) return

  //   if (weapon === 'bolt') {
  //     let weaponCurrentPosition = (playerCurrentPosition -= width)
  //     addCharacter(weaponCurrentPosition, weaponClassBolt)
  //     soundBoltFire.play()
  //     playerCurrentPosition += width
  //     const bolt = setInterval(() => {
  //       removeCharacter(weaponCurrentPosition, weaponClassBolt)
  //       if (weaponCurrentPosition > width) {
  //         weaponCurrentPosition -= width
  //         addCharacter(weaponCurrentPosition, weaponClassBolt)
  //         addCharacter(weaponCurrentPosition, weaponClassBolt)
  //       } else {
  //         weaponCurrentPosition = weaponStartingPosition
  //         clearInterval(bolt)
  //       }
  //       cells.forEach((cell) => {
  //         const cellPosition = cells.indexOf(cell)
  //         const cellClass = cells[cellPosition].classList.value
  //         if (
  //           cellClass === `${enemyClass} ${weaponClassBolt}` ||
  //           cellClass === `${weaponClassBolt} ${enemyClass}`
  //         ) {
  //           removeCharacter(cellPosition, enemyClass)
  //           removeCharacter(cellPosition, weaponClassBolt)

  //           soundEnemyKilled.play()
  //           addCharacter(cellPosition, explosion)
  //           enemyCurrentPosition = enemyCurrentPosition.filter(
  //             (item) => item !== weaponCurrentPosition
  //           )
  //           scoreCounter += scoreModifier1
  //           if (weapon === 'bolt') {
  //             isPowerUpReady++
  //             powerBar.value++
  //           }
  //           powerUpTracker()
  //           enemyRemainingCheck()
  //           displayScore.innerHTML = scoreCounter
  //           clearInterval(bolt)
  //         } else if (
  //           cellClass === `${weaponClassBolt} ${enemyWeaponBolt}` ||
  //           cellClass === `${enemyWeaponBolt} ${weaponClassBolt}`
  //         ) {
  //           removeCharacter(cellPosition, enemyClass)
  //           removeCharacter(cellPosition, weaponClassBolt)
  //           soundExplosion.play()
  //         }
  //       })
  //     }, 75)
  //   } else if (weapon === 'bomb') {
  //     let weaponCurrentPosition = (playerCurrentPosition -= width)
  //     addCharacter(weaponCurrentPosition, weaponClassBomb)
  //     soundBoltFire.play()
  //     playerCurrentPosition += width
  //     const Bomb = setInterval(() => {
  //       removeCharacter(weaponCurrentPosition, weaponClassBomb)
  //       if (weaponCurrentPosition > width) {
  //         weaponCurrentPosition -= width
  //         addCharacter(weaponCurrentPosition, weaponClassBomb)
  //       } else {
  //         weaponCurrentPosition = weaponStartingPosition
  //         clearInterval(Bomb)
  //       }
  //       cells.forEach((cell) => {
  //         const cellPosition = cells.indexOf(cell)
  //         const cellClass = cells[cellPosition].classList.value
  //         if (
  //           cellClass === `${enemyClass} ${weaponClassBomb}` ||
  //           cellClass === `${weaponClassBomb} ${enemyClass}`
  //         ) {
  //           removeCharacter(cellPosition, enemyClass)
  //           removeCharacter(cellPosition, weaponClassBomb)
  //           soundEnemyKilled.play()
  //           addCharacter(cellPosition, explosion)
  //           enemyCurrentPosition = enemyCurrentPosition.filter(
  //             (item) => item !== weaponCurrentPosition
  //           )
  //           scoreCounter += scoreModifier1
  //           isPowerUpReady++
  //           powerBar.value++
  //           powerUpTracker()
  //           enemyRemainingCheck()
  //           displayScore.innerHTML = scoreCounter
  //           clearInterval(Bomb)
  //         } else if (
  //           cellClass === `${weaponClassBomb} ${enemyWeaponBolt}` ||
  //           cellClass === `${enemyWeaponBolt} ${weaponClassBomb}`
  //         ) {
  //           removeCharacter(cellPosition, enemyClass)
  //           removeCharacter(cellPosition, weaponClassBomb)
  //           soundExplosion.play()
  //         }
  //       })
  //     }, 75)
  //   }
  // }
  // function powerUpTracker() {
  //   if (isPowerUpReady === powerUpCharge) {
  //     bonusDisplay.innerText = 'BOMB'
  //     powerBarH3.innerText = 'READY TO FIRE'
  //   }
  // }
  // setInterval(() => {
  //   cells.forEach((cell) => {
  //     const cellPosition = cells.indexOf(cell)
  //     if (cell.classList.value === explosion) {
  //       removeCharacter(cellPosition, explosion)
  //     }
  //   })
  // }, 850)
  // //gameScreen functions - enemy functions
  // function setStartGame() {
  //   stopGame = false
  //   enemyMovementStart()
  // }
  // function enemyMovementStart() {
  //   if (stopGame) return

  //   ufoAppears()
  //   let direction = 1
  //   soundBoltFire.play()

  //   let soundCounter = 0
  //   const enemyMovement = setInterval(() => {
  //     if (stopGame) clearInterval(enemyMovement)

  //     soundCounter++
  //     if (soundCounter === 1) {
  //       soundMovement1.play()
  //     } else if (soundCounter === 2) {
  //       soundMovement2.play()
  //     } else if (soundCounter === 3) {
  //       soundMovement3.play()
  //     } else if (soundCounter === 4) {
  //       soundMovement4.play()
  //       soundCounter = 0
  //     }
  //     //*define edges
  //     const isOnEdge = cells.some((item, index) => {
  //       const hasEnemy = item.classList.value === enemyClass
  //       const isEdge =
  //         direction === 1 ? index % width === width - 2 : index % width === 1
  //       if (hasEnemy && isEdge) {
  //         return true
  //       }
  //     })
  //     //*remove enemy
  //     enemyCurrentPosition.forEach((eachEnemy) => {
  //       removeCharacter(eachEnemy, enemyClass)
  //     })
  //     //*move down if on edge
  //     if (isOnEdge) {
  //       enemyCurrentPosition = enemyCurrentPosition.map((item) => item + height)
  //       direction = direction * -1

  //       //*mutate array left or right
  //     } else {
  //       enemyCurrentPosition.forEach((enemy, index) => {
  //         enemyCurrentPosition[index] = enemy + direction
  //       })
  //     }
  //     //*add enemy back
  //     enemyCurrentPosition.forEach((eachEnemy) => {
  //       addCharacter(eachEnemy, enemyClass)
  //     })
  //     const isOnFloor = cells.some((item, index) => {
  //       const hasEnemy = item.classList.value === enemyClass
  //       const isFloor = (height - 1) * width
  //       if (index >= isFloor && hasEnemy) {
  //         return true
  //       }
  //     })
  //     if (isOnFloor) {
  //       gameOver()
  //       clearInterval(enemyMovement)
  //     }
  //   }, 1000)
  // }
  //#endregion

  //#region //! old code delete after testing
  // function enemyRemainingCheck() {
  //   const enemyRemainingCheck = setInterval(() => {
  //     const enemyCounter = enemyCurrentPosition.length

  //     if (enemyCounter === 0) {
  //       gameWin()
  //       clearInterval(enemyRemainingCheck)
  //     }
  //   }, 100)
  // }
  //#endregion

  //#region //! increaseSpeed and enemyfire old
  // function increaseSpeed() {
  //   const speedFraction = 1000 / enemyStartingPosition.length
  //   let speed = 1000
  //   let compareLength = enemyStartingPosition.length
  //   const reduceSpeedNumber = setInterval(() => {
  //     if (enemyCurrentPosition.length - 1 === compareLength) {
  //       speed -= speedFraction
  //       compareLength = enemyCurrentPosition.length
  //     }

  //     if (speed === 0) {
  //       clearInterval(reduceSpeedNumber)
  //     }
  //   }, 100)
  // }
  // // increaseSpeed()
  // function enemyWeaponFire() {
  //   /**
  //    * enemy fires a bolt
  //    * bolt moves vertically down
  //    * if bolt hits player, player loses one life(shield)
  //    * if player loses all life (life counter === 0, player loses run Game Over)
  //    * interval boundary is floor
  //    */
  //   //const randomCalc = randomNumber(1,weaponFireProbability)

  //   let randomCalc = 1
  //   enemyCurrentPosition.forEach((enemy) => {
  //     const isEnemyClass = cells[enemy].classList.value === enemyClass
  //     const enemyWeaponPosition = cells[enemy + width]
  //     let newEnemyWeaponPosition = enemy + width
  //     if (randomCalc === 1 && isEnemyClass) {
  //       addCharacter(enemy + width, enemyWeaponBolt)
  //       const useBoltWeapon = setInterval(() => {
  //         removeCharacter(newEnemyWeaponPosition, enemyWeaponBolt)
  //         if (newEnemyWeaponPosition < (height - 1) * width) {
  //           newEnemyWeaponPosition += width
  //           addCharacter(newEnemyWeaponPosition, enemyWeaponBolt)
  //         }
  //         cells.forEach((cell) => {
  //           const cellPosition = cells.indexOf(cell)
  //           let cellValue = cell.classList.value
  //           //cells[newEnemyWeaponPosition].classList.value === enemyClass

  //           if (cellValue === `${playerClass} ${enemyWeaponBolt}`) {
  //             lifeCounter--
  //             cellValue = playerClass
  //             if (lifeCounter === 0) {
  //               gameOver()
  //             }
  //           }
  //         })
  //       }, 1000)
  //     }
  //   })
  // }
  //#endregion

  // function ufoAppears() {
  //   if (stopGame) return

  //   let ufoSoundCounter = 0
  //   const timerForAppearing = setInterval(() => {
  //         if (stopGame) clearInterval(timerForAppearing)

  //     ufoSoundCounter++
  //     if (ufoSoundCounter === 1) {
  //       soundUfo1.play()
  //     } else if (ufoSoundCounter === 2) {
  //       soundUfo2.play()
  //       ufoSoundCounter = 0
  //     }
  //     const ufoStartingPosition = width - 2
  //     let ufoCurrentPosition = ufoStartingPosition
  //     addCharacter(ufoStartingPosition, ufoClass)
  //     const ufoSpeed = setInterval(() => {
  //       removeCharacter(ufoCurrentPosition, ufoClass)
  //       ufoCurrentPosition--
  //       addCharacter(ufoCurrentPosition, ufoClass)
  //       if (ufoCurrentPosition === 1) {
  //         removeCharacter(ufoStartingPosition, ufoClass)
  //         clearInterval(ufoSpeed)
  //       }
  //     }, 300)
  //   }, 12000)
  // }
}
window.addEventListener('DOMContentLoaded', init)
