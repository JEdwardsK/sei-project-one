# SEI Project One: Space Invaders
Make a grid based JavaScript game

## Contents


## Technologies
- HTML5
- CSS3
- JavaScript
- Blender 2.93

## Brief:


## Process:

working with the brief, I started by determining what the minimum requirements for basic functionality to deliver a recognisable Space Invaders experience:
- the player is at the bottom of the screen and moves left to right
- the enemies

i started of with place holder icons and images to render the actions, before implenting the design

### Functionality

#### Player movement



#### Enemy Generation and Movement

#### Win/Lose conditions

#### Player actions


### Design

For the design, I attempted a retro arcade-style. I searched for space invaders icons using a image search engine and adjusted the colours where necessary using Preview on Mac.

I also wanted to have the styling as though the game was being played on an arcade machine. For this i made a model arcade machine using Blender, and animated a short turnaround of  the model to be used on page load. I intended for the final frame to transition into the background image and frame the game's grid.


Rather than having the game screen visible immeadiately, I made different screens:

- a Home Screen
- a Tutorial Screen
- Win/ Lose State Screens
- an Options Screen
- Highscore and Load Game Screens

The Highscore, Game Load and Options Screens did not have functionality by the end of the project, but were create to allow for expansion either as strech goals or in the future.

```
  function toTutorial() {
    splashScreen.classList.add('hidden')
    tutorialScreen.classList.remove('hidden')
  }

tutorialButton.addEventListener('click', toTutorial)

```

the screens were all given a class of 'hidden'. This class had the attribute display: none. Eventlistener's wereadded to specific buttons that would add or remove the class to screen's on click.


## Added Functionality Attempts

i attempted to add the following to the game:
- a bonus ship that appears at random intervals, can be shot down for extra points/ different weapon
- a weapon power up that destroys enemies in a specifc pattern, such as all the enemies in the row, column or surrounding enemies.


## Known Errors
  - cannot play video for opening splash screen
  - no sound
  - powerup (bomb) does not differ in functionality from regular weapon (weapon bolt)
  - enemies shooting back
  - enemies moving crazy at certain point
  - mothership doesn't disappear


## Learning Outcomes

### Wins

### Challenges
#### Enemy Actions

##### Movement

##### Weapon Fire
### Improvements / Future Improvements
  - differing enemy movement speed based on enemies remaining
  - bonus levels
  - saving data to local storage to allow for high score/ game continue
  - havung options for game settings, such as difficulty, number of powerups, bonuses etc








