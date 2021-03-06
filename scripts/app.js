const init = () => {
  //#region  //* GAME SCREEN SELECTORS
  const grid = document.querySelector('.grid')
  const bonusDisplay = document.querySelector('.displayCurrentBonusWeapon p')
  const powerBar = document.querySelector('.powerBar')
  const powerBarH3 = document.querySelector('.displayPowerBar h3')
  const startButton = document.querySelector('.startButton')
  const resetButton = document.querySelector('.resetButton')
  const displayScore = document.querySelector('.displayScore p')
  const displayLife = document.querySelector('.displayLife p')
  const displayLevel = document.querySelector('.displayLevel p')
  const finalScore = document.querySelector('.finalScore')
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


  //#endregion

  //#region //* UNIVERSAL SELECTORS

  const navigationButton = document.querySelectorAll('.navigationButton')
  const allSections = document.querySelectorAll('section')
  //#endregion

  //#region //* VARIABLES

  //* grid variables
  // adjustable variables. height may break due to css styling percentages for `.cell div`. change lifeCounter and currentLevel to let when implementing different levels or life counters
  const height = 20
  let lifeCounter = 1
  const currentLevel = 1
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
  let isGameStart = false

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

  /**
   * Generates the grid and defines its boundaries, updating the `leftBoundary`, `rightBoundary`, `bottomBoundary` and `topBoundary` variables.
   */
  const createGameBoard = () => {
    // generate the grid. assigns child div elements to the grid element, based on the `cellCount` variable
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
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
    const weaponStartingPosition = playerCurrentPosition - width
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
      weaponCurrentPosition -= width
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
    // const player = cells[position].classList.contains(classPlayer)
    const bombArea = [
      position - 1 - width,
      position - width,
      position - width + 1,
      position - 1,
      position,
      position + 1
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
        gameOver('lose')
        clearInterval(movement)
      }
    }, 1000)
  }

  /**
   * Assigns the class hidden to all screens, then removes the class hidden from the Element `screen`. The screen is selected based on the button's value.
   * @param {Element} display the screen to display
   */
  const toggleScreen = (event) => {
    let className = ''
    if (!event.target) {
      className = event
    } else {
      className = event.target.value
    }
    allSections.forEach((section) => {
      if (!section.classList.contains('hidden')) {
        section.classList.add('hidden')
      }
    })
    const screen = document.querySelector(className)
    screen.classList.remove('hidden')
  }
  /**
   * Handles end of game, navigates to Game Win/Over screen based on `state` parameter.
   * @param {string} state either `'win'` or `'lose'`
   */
  const gameOver = (state) => {
    lifeCounter = 0
    gameEnd = true
    if (state === 'win') toggleScreen('.gameWinScreen')
    else if (state === 'lose') toggleScreen('.gameOverScreen')
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
   * Loads the game board. runs the functions `createGameBoard` and
    `generateStartingPositions`
   */
  const gameLoad = () => {
    createGameBoard()
    generateStartingPositions(numberOfRows)
  }
  const resetGame = () => {
    window.location.reload()
    toggleScreen('.resetButton')
  }
  /**
   * Start the game. Calls the enemy functions
   */
  const gameStart = () => {
    console.log('test')
    if (!isGameStart) {
      isGameStart = true
      enemyMovement()
      // enemyWeaponFire()
      startButton.disabled = true
      startButton.setAttribute('style', 'color: rgb(144, 140, 140)')
    }
  }
  gameLoad()

  const handleKeyDown = (event) => {
    console.log(event.keyCode)
    const { keyCode: key } = event
    const movementKeys = [37, 39, 65, 68]
    if (key === 13 ) gameStart()
    else if (movementKeys.includes(key)) playerMovement(key)
    else if (key === 32 ) useWeapon('bolt')
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
  document.addEventListener('keydown', handleKeyDown)
  // startButton.addEventListener('click', gameStart)
  navigationButton.forEach((button) => {
    button.addEventListener('click', toggleScreen)
  })
  resetButton.addEventListener('click', resetGame)
  //#endregion
}
window.addEventListener('DOMContentLoaded', init)
