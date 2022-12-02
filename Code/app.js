import Boundary from './Classes/Boundary.js'
import Player from './Classes/Player.js'
import Bomb from './Classes/Bomb.js'
import Enemy from './Classes/Enemy.js'
import Huts from './Classes/Huts.js'

import gameData from './Classes/gameData.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

const pBomb = new Audio('sounds/p-bomb.mp3')
pBomb.volume = 0.1

const winAudio = new Audio('sounds/win.mp3')
winAudio.volume = 0.1

const die = new Audio('sounds/die.mp3')
die.volume = 0.1

const takeDmg = new Audio('sounds/takeDmg.mp3')
takeDmg.volume = 0.1

const bombImage = new Image()
bombImage.src = './assets/Bomb.png'
// In lobby add Functionality to change the game volume based on input system
const gameOn = new Audio('sounds/game.wav')
gameOn.volume = 0.2

const menu = document.querySelector('.menu')
const levels = document.querySelectorAll('.level')
const closeButtons = document.querySelectorAll('.close-btn')
const authors = document.querySelector('.authors')
const instruction = document.querySelector('.instruction')
const openButtons = document.querySelectorAll('.set-btn')
const gameDisplay = document.querySelector('.game-display')
const copyText = document.querySelectorAll('.copy-text')

const playerImage = new Image()
playerImage.src = './assets/player.png'

const playerX = new Image()
playerX.src = './assets/soldier.png'

const playerDie = new Image()
playerDie.src = 'assets/Player_die.png'

const box = new Image()
box.src = 'assets/boxes.png'

const hutImage = new Image('image/hut.png')
hutImage.src = 'assets/hut.png'

const pillar = new Image()
pillar.src = 'assets/Pillar.png'

const bg = new Image()

let huts = undefined
let bombs = []
let movementSpeed = 3
let createBombs = undefined
let inTouch = false
let press = {
  up: undefined,
  down: undefined,
  left: undefined,
  right: undefined,
}
let sliding = 0.01
let lastKey = undefined
let boom = false
let boomed = false
let currentLevel = undefined

let player = undefined
let enemies = undefined
let collisionMap = undefined
let boundaries = undefined
let bricks = undefined
let pillars = undefined
let huts2 = undefined
let spp = undefined
let spe = undefined
let ice = undefined
let bombAnimationState = 0
let animate = undefined

let levelsWon = []

levels.forEach((level) => {
  level.addEventListener('click', (e) => {
    if (e.currentTarget.className.includes('playable')) {
      if (e.currentTarget.className.includes('level-0')) {
        currentLevel = 0
      } else if (e.currentTarget.className.includes('level-1')) {
        currentLevel = 1
      } else if (e.currentTarget.className.includes('level-2')) {
        currentLevel = 2
      } else if (e.currentTarget.className.includes('level-3')) {
        currentLevel = 3
      } else if (e.currentTarget.className.includes('level-4')) {
        currentLevel = 4
      } else if (e.currentTarget.className.includes('level-5')) {
        currentLevel = 5
      }

      huts = []
      collisionMap = []
      boundaries = []
      bricks = []
      pillars = []
      huts2 = []
      spp = []
      spe = []
      ice = []
      enemies = []
      //Initialing values

      let curr = currentLevel

      let collisions = gameData[curr].data
      bg.src = gameData[curr].background

      gameOn.play()

      for (let i = 0; i < collisions.length; i += 32) {
        collisionMap.push(collisions.slice(i, i + 32))
      }

      collisionMap.forEach((row, y) => {
        row.forEach((symbol, x) => {
          if (symbol == 0) {
            enemies.push(
              new Enemy({
                position: {
                  x: x * 32,
                  y: y * 32,
                },
                velocity: {
                  x: 0,
                  y: 0,
                },
                move: 'y',
                image: '',
                spacing: 0,
                width: 32,
                height: 60,
                health: 2,
              })
            )
          } else if (symbol == 2) {
            boundaries.push(
              new Boundary({
                position: {
                  x: x * Boundary.width,
                  y: y * Boundary.height,
                },
                width: 32,
                height: 32,
              })
            )
          } else if (symbol == 3) {
            boundaries.push(
              new Boundary({
                position: {
                  x: x * Boundary.width,
                  y: y * Boundary.height,
                },
                width: 32,
                height: 32,
              })
            )
            pillars.push(
              new Boundary({
                position: {
                  x: x * Boundary.width,
                  y: y * Boundary.height,
                },
                width: 32,
                height: 32,
                spacing: 0,
                image: pillar,
              })
            )
          } else if (symbol == 4) {
            boundaries.push(
              new Boundary({
                position: {
                  x: x * Boundary.width,
                  y: y * Boundary.height,
                },
                special: true,
                width: 32,
                height: 32,
              })
            )
            bricks.push(
              new Boundary({
                position: {
                  x: x * Boundary.width,
                  y: y * Boundary.height,
                },
                image: box,
                width: 32,
                height: 32,
              })
            )
          } else if (symbol == 5) {
            huts2.push(
              new Huts({
                position: {
                  x: x * 32,
                  y: y * 32,
                },
                image: hutImage,
              })
            )
          }
          //  Player spawning Points
          else if (symbol == 6) {
            spp.push(
              new Boundary({
                position: {
                  x: x * Boundary.width,
                  y: y * Boundary.height,
                },
                width: 32,
                height: 32,
              })
            )
          } // Enemy Spawning Points
          else if (symbol == 7) {
            enemies.push(
              new Enemy({
                position: {
                  x: x * 32,
                  y: y * 32,
                },
                velocity: {
                  x: 0,
                  y: 0,
                },
                move: 'x',
                image: playerX,
                spacing: 0,
                width: 48,
                height: 48,
                health: 2,
              })
            )
          } else if (symbol == 8) {
            ice.push(
              new Boundary({
                position: {
                  x: x * Boundary.width,
                  y: y * Boundary.height,
                },
                width: 32,
                height: 32,
              })
            )
          }
        })
      })

      player = new Player({
        position: {
          x: spp[0].position.x,
          y: spp[0].position.y,
        },
        velocity: {
          x: 0,
          y: 0,
        },
        image: playerImage,
        health: gameData[curr].health,
        spacing: 8,
        toCollect: gameData[curr].totalHuts,
      })

      //Making Game visible
      menu.classList.add('offScreen')
      gameDisplay.classList.add('onScreen')

      bg.onload = () => {
        animate = setInterval(() => {
          c.drawImage(bg, 0, 0)

          //Git
          boundaries.forEach((boundary) => {
            boundary.draw()
          })

          huts2.forEach((hut, i) => {
            if (
              rectangularCollision({
                rectangle1: hut,
                rectangle2: player,
              })
            ) {
              player.collected++
              huts2.splice(i, 1)
            }
            hut.draw()
          })

          huts.forEach((hut, i) => {
            if (
              rectangularCollision({
                rectangle1: hut,
                rectangle2: player,
              })
            ) {
              player.collected++
              huts.splice(i, 1)
            }
            hut.draw()
          })

          if (bricks.length >= 1) {
            for (let i = 0; i < bricks.length; i++) {
              if (bombs[0] && boom) {
                if (
                  rectangularCollision({
                    rectangle1: bombs[0],
                    rectangle2: bricks[i],
                  })
                ) {
                  bricks[i].spacing = 32
                }
              }
              bricks[i].draw()
            }
          }

          if (boundaries.length >= 1) {
            for (let i = 0; i < boundaries.length; i++) {
              if (bombs[0] && boom) {
                if (
                  rectangularCollision({
                    rectangle1: bombs[0],
                    rectangle2: boundaries[i],
                  }) &&
                  boundaries[i].special
                ) {
                  boundaries.splice(i, 1)
                }
              }
              boundaries[i].draw()
            }
          }

          pillars.forEach((pillar) => {
            pillar.draw()
          })

          bombs.forEach((bomb) => {
            if (boom && boomed) {
              for (let i = 0; i < enemies.length; i++) {
                if (
                  rectangularCollision({
                    rectangle1: enemies[i],
                    rectangle2: bombs[0],
                  })
                ) {
                  enemies[i].health--
                  if (enemies[i].health == 0) {
                    let curr = {
                      x: enemies[i].position.x,
                      y: enemies[i].position.y,
                    }
                    setTimeout(() => {
                      huts.push(
                        new Huts({
                          position: {
                            x: curr.x,
                            y: curr.y,
                          },
                          image: hutImage,
                        })
                      )
                    }, 200)
                    enemies.splice(i, 1)
                  }
                  boomed = false
                  break
                }
              }
              bomb.boom()
            } else bomb.draw()
          })

          enemies.forEach((enemy) => {
            for (let i = 0; i < boundaries.length; i++) {
              if (
                rectangularCollision({
                  rectangle1: boundaries[i],
                  rectangle2: enemy,
                })
              ) {
                enemy.speed = -enemy.speed
                break
              }
            }
            enemy.update()
          })

          for (let i = 0; i < enemies.length; i++) {
            if (
              rectangularCollision({
                rectangle1: enemies[i],
                rectangle2: player,
              })
            ) {
              if (!inTouch && player.health > 0) {
                player.health--
                takeDmg.play()
              }
              inTouch = true

              setTimeout(() => {
                inTouch = false
              }, 1000)
            }
          }

          if (player.health == 0) {
            removeEventListener('keydown', move)
            player.image = playerDie

            gameOn.pause()
            clearInterval(createBombs)
            createBombs = undefined
            setTimeout(() => {
              clearInterval(animate)
              animate = undefined
              die.play()
              reset()
            }, 850)
          }

          ice.forEach((tile) => {
            if (
              rectangularCollision({
                rectangle1: tile,
                rectangle2: player,
              })
            ) {
              if (sliding < 1.25) sliding += 0.03

              if (lastKey == 'w') player.position.y -= sliding
              else if (lastKey == 's') player.position.y += sliding
              else if (lastKey == 'a') player.position.x -= sliding
              else if (lastKey == 'd') player.position.x += sliding
            }
          })

          enemies.forEach((enemie) => {
            if (enemie.speed > 0) {
              enemie.spacingY = 96
            } else enemie.spacingY = 32
          })
          //player.toCollect daj zamiast 1
          if (player.collected == player.toCollect) {
            clearInterval(createBombs)
            createBombs = undefined

            gameOn.pause()
            winAudio.play()

            levelsWon.push(curr)

            for (let i = 0; i < levelsWon.length - 1; i++) {
              if (levelsWon[i] == curr) {
                levelsWon.pop()
              }
            }

            levelsWon.forEach((num) => {
              if (num < 5) levels[num + 1].classList.add('playable')
            })

            setTimeout(() => {
              clearInterval(animate)
              animate = undefined
              reset()
            }, 1000)

            //Some kind of way to unlock next level
          }

          player.update()
        }, 10)

        //Allowing Player To move
        addEventListener('keydown', move)
        addEventListener('keyup', stop)

        //Creating Bombs
        if (createBombs == undefined) {
          bombAnimationState = 0
          createBombs = setInterval(() => {
            //pBomb.play()
            boom = false
            bombs.push(
              new Bomb({
                width: 64,
                height: 64,
                position: {
                  x: player.position.x - 20,
                  y: player.position.y - 12,
                },
                image: bombImage,
              })
            )
            bombAnimationState = 1

            setTimeout(() => {
              bombs[0].spacingX = 0
              bombAnimationState = 2
              boom = true
              boomed = true
            }, 750)

            setTimeout(() => {
              if (
                rectangularCollision({
                  rectangle1: player,
                  rectangle2: bombs[0],
                }) &&
                player.health > 0
              ) {
                player.health--
                takeDmg.play()
              }
            }, 900)

            setTimeout(() => {
              bombs.pop()
            }, 950)
          }, 1050)
        }
      }
    }
  })
})

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

function move(e) {
  if (e.key == 'd') {
    lastKey = 'd'
    player.spacing = 40
    if (!press.right) {
      player.spacing = 40
      press.right = setInterval(() => {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x - 5,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            player.velocity.x = 0
            break
          } else player.velocity.x = movementSpeed
        }
      }, 1)
    }
  }
  if (e.key == 'w') {
    lastKey = 'w'
    if (!press.up) {
      press.up = setInterval(() => {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y + 5,
                },
              },
            })
          ) {
            player.velocity.y = 0
            break
          } else player.velocity.y = -movementSpeed
        }
      }, 1)
    }
  }

  if (e.key == 's') {
    lastKey = 's'
    if (!press.down) {
      press.down = setInterval(() => {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y - 5,
                },
              },
            })
          ) {
            player.velocity.y = 0
            break
          } else player.velocity.y = movementSpeed
        }
      }, 1)
    }
  }

  if (e.key == 'a') {
    lastKey = 'a'
    if (!press.left) {
      player.spacing = 8
      press.left = setInterval(() => {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x + 5,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            player.velocity.x = 0
            break
          } else player.velocity.x = -movementSpeed
        }
      }, 1)
    }
  }
}

function stop(e) {
  if (e.key == 'w') {
    clearInterval(press.up)
    player.velocity.y = 0
    press.up = undefined
  }
  if (e.key == 's') {
    clearInterval(press.down)
    player.velocity.y = 0
    press.down = undefined
  }
  if (e.key == 'a') {
    clearInterval(press.left)
    player.velocity.x = 0
    press.left = undefined
  }
  if (e.key == 'd') {
    clearInterval(press.right)
    player.velocity.x = 0
    press.right = undefined
  }
}

function reset() {
  menu.classList.remove('offScreen')
  gameDisplay.classList.remove('onScreen')

  player.collected = 0
}

//Copy text Functionality

copyText.forEach((text) => {
  text.querySelector('button').addEventListener('click', () => {
    copyText.forEach((text) => {
      text.classList.remove('active')
    })
    let input = text.querySelector('input.text')
    input.select()
    document.execCommand('copy')
    text.classList.add('active')
    window.getSelection().removeAllRanges()

    setTimeout(() => {
      text.classList.remove('active')
    }, 2000)
  })
})

openButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (e.currentTarget.className.includes('authors-btn')) {
      authors.classList.remove('offScreen')
    }
    if (e.currentTarget.className.includes('instruction-btn')) {
      instruction.classList.remove('offScreen')
    }
  })
})

closeButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (e.currentTarget.className.includes('authors-btn')) {
      authors.classList.add('offScreen')
    }
    if (e.currentTarget.className.includes('instruction-btn')) {
      instruction.classList.add('offScreen')
    }
  })
})

let imagesAniate = setInterval(() => {
  if (huts) {
    huts.forEach((hut) => {
      if (hut.spacing == 96) hut.spacing = 0
      else hut.spacing += 32
    })
  }

  if (huts2) {
    huts2.forEach((hut) => {
      if (hut.spacing == 96) hut.spacing = 0
      else hut.spacing += 32
    })
  }
}, 300)

let playerAnimate = setInterval(() => {
  if (player && player.health == 0) {
    player.image = playerDie
    // 416 + 8 becouse of player on center
    if (player.spacing != 456) {
      player.spacing += 32
      player.update()
    }
  }
}, 60)

let enemyAnimate = setInterval(() => {
  if (enemies) {
    enemies.forEach((enemie) => {
      if (enemie.move == 'x') {
        if (enemie.spacing == 224) enemie.spacing = 0
        else enemie.spacing += 32
      }
    })
  }
}, 400)

let bombTime = 50
let bombAnimate = setInterval(() => {
  if (bombAnimationState == 1 && bombs[0]) {
    bombTime = 50
    bombs[0].spacingX += 32
  } else if (bombAnimationState == 2 && bombs[0]) {
    bombTime = 100
    bombs[0].spacingY = 32

    if (bombs[0].spacingX == 64) bombs[0].spacingX = 64
    else bombs[0].spacingX += 32
  }
}, bombTime)
