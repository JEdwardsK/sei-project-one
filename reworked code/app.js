function init() {
  // Document selectors
  const grid = document.querySelector('.grid')
  // const startButton = document.querySelector('.startButton')

  //#region VARIABLES

  //* grid variables
  // can be adjusted to amend the grid size
  const height = 20

  // do not adjust, the empty arrays will have numbers pushed into them in later functions
  const width = height
  const cellCount = height * width
  const cells = []
  const leftBoundary = []
  const rightBoundary = [cellCount - 1]
  const bottomBoundary = []
  const topBoundary = []

  //* player variables
  // the starting player position should always be in the centre of the bottom row on the game board.
  const playerStartingPosition = 390
  let playerCurrentPosition = playerStartingPosition

  //* enemy variables
  // can be amended to increase the number of enemies in a row, and the number of rows in the starting formation.
  const enemyFirstRow = [63, 64, 65, 66, 67, 68, 69, 70, 71, 72]
  const numberOfRows = 3

  // do not adjust, the `enemyPosition` variable will be populated by a function based on the `numberOfRowsFunction`
  let enemyPosition = []

  // className variables, used for updating element classLists, do not adjust.
  const classPlayer = 'playerCharacter'
  const classUFO = 'ufoCharacter'
  const classBolt = 'weaponBolt'
  const classEnemy = 'enemyCharacter'
  const classCollision = 'explosion'
  const classBomb = 'weaponBomb'
  //#endregion

  //#region FUNCTION DECLARATIONS
  /**
   * takes a cell position and determines whether there has been a collision at the given at that cell
   * @param {number} position cell position
   * @param {string} type string defining case for switch, can be 'enemy2weapon' or 'enemy2player'
   * @returns {boolean} if true, a collision occurred
   */
  const isCollision = (position, type) => {
    const enemy = cells[position].classList.contains(classEnemy)
    const weapon = cells[position].classList.contains(classBolt)
    const player = cells[position].classList.contains(classPlayer)
    switch (type) {
      case 'enemy2weapon':
        return enemy && weapon
      case 'enemy2player':
        return enemy && player
      default:
        return false
    }
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
    cells[position].classList.contains(character)
      ? cells[position].classList.remove(character)
      : cells[position].classList.add(character)
  }

  /**
   * This function listens for key inputs from the user and takes a particular action based on the `keyCode` value. Handles player movement and weapon fire
   */
  const playerAction = (event) => {
    console.log(event.keyCode)
    const { keyCode: key } = event
    const isLeftBoundary = playerCurrentPosition % width === width - 1
    const isRightBoundary = playerCurrentPosition % width === 0
    const weaponStartingPosition = playerCurrentPosition - height
    const useWeapon = () => {
      let weaponCurrentPosition = weaponStartingPosition
      let count = -2
      changeCellClasslist(classBolt, weaponCurrentPosition)
      const shoot = setInterval(() => {
        changeCellClasslist(classBolt, weaponCurrentPosition)
        weaponCurrentPosition -= width
        if (weaponCurrentPosition < width - 1) {
          clearInterval(shoot)
        } else {
          changeCellClasslist(classBolt, weaponCurrentPosition)
        }
        if (weaponCurrentPosition === 130) {
          console.log(
            cells[weaponCurrentPosition].classList.contains(classEnemy)
          )
        }
        if (isCollision(weaponCurrentPosition, 'enemy2weapon')) {
          console.log('hit')
          changeCellClasslist(classBolt, weaponCurrentPosition)
          changeCellClasslist(classEnemy, weaponCurrentPosition)
          changeCellClasslist(classCollision, weaponCurrentPosition)
          clearInterval(shoot)
        }
      }, 100)
    }
    // left arrow or 'a'
    if (key === 39 && !isLeftBoundary) {
      changeCellClasslist(classPlayer, playerCurrentPosition)
      playerCurrentPosition += 1
      changeCellClasslist(classPlayer, playerCurrentPosition)
      // right arrow or 'd'
    } else if (key === 37 && !isRightBoundary) {
      changeCellClasslist(classPlayer, playerCurrentPosition)
      playerCurrentPosition -= 1
      changeCellClasslist(classPlayer, playerCurrentPosition)
    } else if (key === 32) {
      useWeapon()
    } else if (key === 13) {
      enemyMovement()
    }
  }
  /**
   * Handles enemy movement and weapon action. Enemy movement is based on an interval of one second
   */
  const enemyMovement = () => {
    let count = 1
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
      //change direction on edge
      count++
      const isInBoundary =
        enemyPosition.some((item) => rightBoundary.includes(item)) ||
        enemyPosition.some((item) => leftBoundary.includes(item))
      const isFloor = enemyPosition.some((item) =>
        bottomBoundary.includes(item)
      )
      enemyPosition = enemyPosition.filter(
        (position) => !cells[position].classList.contains(classCollision)
      )
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

  //#endregion

  //#region //* functions called from event listeners
  /**
   * Loads the gameboard. runs the functions `createGameBoard` and
    `generateStartingPositions`
   */
  const gameLoad = () => {
    createGameBoard()
    generateStartingPositions(numberOfRows)
  }

  /**
   * Start the game. Calls the enemy functions
   */
  const gameStart = () => {
    enemyMovement()
  }
  gameLoad()
  document.addEventListener('keydown', playerAction)
  // startButton.addEventListener('click', gameStart)
}
window.addEventListener('DOMContentLoaded', init)
