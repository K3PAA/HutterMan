import { boundaries, bricks, spp, spe } from './map/Collisions.js'
import Player from './Classes/Player.js'
import Bomb from './Classes/Bomb.js'
import Enemy from './Classes/Enemy.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

c.fillRect(0, 0, canvas.width, canvas.height)

let pBomb = new Audio('sounds/p-bomb.mp3')
pBomb.volume = 0.1

const playerImage = new Image()
playerImage.src = './assets/player.png'

const playerDie = new Image()
playerDie.src = 'assets/Player_die.png'

const bg = new Image()
bg.src = './image/Game3.png'

let bombs = []

const player = new Player({
  position: {
    x: spp[0].position.x,
    y: spp[0].position.y,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  image: playerImage,
  health: 3,
  spacing: 8,
})

const enemies = []
for (let i = 0; i < 4; i++) {
  {
    enemies.push(
      new Enemy({
        position: {
          x: spe[i].position.x,
          y: spe[i].position.y + 2,
        },
        velocity: {
          x: 0,
          y: 0,
        },

        width: 32,
        height: 60,
        health: 2,
      })
    )
  }
}

let inTouch = false
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

function animate() {
  requestAnimationFrame(animate)

  c.drawImage(bg, 0, 0)

  boundaries.forEach((boundary) => {
    boundary.draw()
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
      if (!inTouch && player.health > 0) player.health--
      inTouch = true

      setTimeout(() => {
        inTouch = false
      }, 1000)
    }
  }

  if (player.health == 0) {
    player.image = playerDie
    clearInterval(createBombs)
    removeEventListener('keydown', move)
  }

  if (player.velocity.x > 0) {
    player.spacing = 40
  } else {
    player.spacing = 8
  }
  player.update()
}

let movementSpeed = 4

let press = {
  up: undefined,
  down: undefined,
  left: undefined,
  right: undefined,
}

let boom = false
let boomed = false

addEventListener('keydown', move)

addEventListener('keyup', stop)

let createBombs = undefined

bg.onload = () => {
  animate()

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
      })
    )

    setTimeout(() => {
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
      }

      bombs.pop()
    }, 900)
  }, 1100)
}

function move(e) {
  if (e.key == 'd') {
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

//Copy text Functionality

let copyText = document.querySelectorAll('.copy-text')

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

const closeButtons = document.querySelectorAll('.close-btn')
const authors = document.querySelector('.authors')
const instruction = document.querySelector('.instruction')
const openButtons = document.querySelectorAll('.set-btn')

console.log(openButtons)

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
