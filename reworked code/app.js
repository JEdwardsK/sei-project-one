function init() {

  const height = 20
  const width = 20
  const cellCount = height * width
  const grid = document.querySelector('.grid')
  const playerStartingPosition = 390
  let playerCurrentPosition = playerStartingPosition
  const cells = []
  let enemyPosition = []
  const enemyFirstRow = [63, 64, 65, 66, 67, 68, 69, 70, 71, 72]
  const leftBoundary = []
  const rightBoundary = [cellCount - 1]
  const bottomBoundary = []
  const topBoundary = []
  const isCollision = (position, type) => {
    const enemy =  cells[position].classList.contains(enemyClass)
    const weapon =  cells[position].classList.contains('bolt')
    const player =  cells[position].classList.contains(playerClass)
    switch (type) {
      case 'enemy2weapon':
        return enemy && weapon
      case 'enemy2player':
        return enemy && player
      default:
        return false
    }
  }
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
  console.log('right boundary', rightBoundary)
  // make the grid
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.innerText = i
    grid.appendChild(cell)
    cells.push(cell)
  }
  const addStartingPositions = (rowNumber) => {
    cells[playerStartingPosition].classList.add(playerClass)
    leftBoundary.forEach(position => {
      cells[position].classList.add('boundary')
    })
    rightBoundary.forEach(position => {
      cells[position].classList.add('boundary')
    })
    topBoundary.forEach(position => {
      cells[position].classList.add('bottom')
    })

    const empty = []
    for (let i = 1; i <= rowNumber; i++) {
      const row = enemyFirstRow.map(cell => cell + (i * 20))
      empty.push(row)
    }
    enemyPosition = empty.flat()
  }
  addStartingPositions(3)

  const changeCellClasslist = (character, position ) => {
    // switch (type) {
    //   case 'add':
    //     cells[position].classList.add(character)
    //     break
    //   case 'remove':
    //     cells[position].classList.remove(character)
    //     break
    //     default:
    //       break
    //     }
       cells[position].classList.contains(character) ? cells[position].classList.remove(character) :
        cells[position].classList.add(character)
  }
  enemyPosition.forEach(enemy => {
    cells[enemy].classList.add(enemyClass)
  })
  const playerAction = (event) => {
    console.log(event.keyCode)
    const { keyCode: key } = event
    const isLeftBoundary = playerCurrentPosition % width === width - 1
    const isRightBoundary = playerCurrentPosition % width === 0
    const weaponStartingPosition = playerCurrentPosition - height
    const useWeapon = () => {
      let weaponCurrentPosition = weaponStartingPosition
      let count = -2
      changeCellClasslist('bolt', weaponCurrentPosition)
      const shoot = setInterval(() => {
        changeCellClasslist('bolt', weaponCurrentPosition)
        weaponCurrentPosition -= width
        if (weaponCurrentPosition < width - 1) {
          clearInterval(shoot)
        } else {
          changeCellClasslist('bolt', weaponCurrentPosition)
        }
        if (weaponCurrentPosition === 130) {
          console.log(
            cells[weaponCurrentPosition].classList.contains(enemyClass)
          )
        }
        if (isCollision(weaponCurrentPosition, 'enemy2weapon')) {
          console.log('hit')
          changeCellClasslist('bolt', weaponCurrentPosition)
          changeCellClasslist(enemyClass, weaponCurrentPosition)
          changeCellClasslist('explosion', weaponCurrentPosition)
          clearInterval(shoot)

        }

      }, 100)
    }
    // left arrow
    if (key === 39 && !isLeftBoundary) {
      changeCellClasslist(playerClass, playerCurrentPosition)
      playerCurrentPosition += 1
      changeCellClasslist(playerClass, playerCurrentPosition)
    // right arrow
    } else if (key === 37 && !isRightBoundary) {
      changeCellClasslist(playerClass, playerCurrentPosition)
      playerCurrentPosition -= 1
      changeCellClasslist(playerClass, playerCurrentPosition)
    } else if (key === 32) {
      useWeapon()
    }
  }
  const enemyMovement = () => {
    let soundCounter = 1
    let direction = 1
    let isAlreadyInBoundary = false
    const allMove = (movement) => {
      enemyPosition.forEach((enemy) => {
        changeCellClasslist(enemyClass, enemy)
      })

      enemyPosition = enemyPosition.map(
        (enemy) => (enemy += movement)
      )

      enemyPosition.forEach((enemy) => {
        changeCellClasslist(enemyClass, enemy)
      })
    }

    const movement = setInterval(() => {
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
      //change direction on edge
      count++
      const isInBoundary =
        enemyPosition.some((item) => rightBoundary.includes(item)) ||
        enemyPosition.some((item) => leftBoundary.includes(item))
      const isFloor = enemyPosition.some((item) => bottomBoundary.includes(item))

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
  enemyMovement()



  document.addEventListener('keydown', playerAction)
}
window.addEventListener('DOMContentLoaded', init)
