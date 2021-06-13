// //* FUNCTIONS TO WORKOUT

// const soundUfo1 = document.querySelector('.soundUfo1')
// const soundUfo2 = document.querySelector('.soundUfo2')
// const classUFO = 'ufoCharacter'

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


// function ufoAppears() {
//   if (stopGame) return

//   let ufoSoundCounter = 0
//   const timerForAppearing = setInterval(() => {
//     if (stopGame) clearInterval(timerForAppearing)

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