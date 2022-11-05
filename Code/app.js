import boundaries from './map/collision.js'
import Player from './Classes/Player.js'
import Bomb from './Classes/Bomb.js'
import bricks from './map/breakable.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

c.fillRect(0, 0, canvas.width, canvas.height)

let pBomb = new Audio('sounds/p-bomb.mp3')
pBomb.volume = 0.1

const playerImage = new Image()
playerImage.src = './image/player.png'

const bg = new Image()
bg.src = './assets/Game.png'

let bombs = []

const player = new Player({
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  image: playerImage,
})

let moving = {
  x: true,
  y: true,
}
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
          bricks.splice(i, 1)
        }
      }
      bricks[i].draw()
    }
  }

  if (press.up) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 4,
            },
          },
        })
      ) {
        moving.y = false
        break
      } else moving.y = true
    }
  }
  if (press.down) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 4,
            },
          },
        })
      ) {
        moving.y = false
        break
      } else moving.y = true
    }
  }
  if (press.left) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 4,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving.x = false
        break
      } else moving.x = true
    }
  }
  if (press.right) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving.x = false
        break
      } else moving.x = true
    }
  }

  bombs.forEach((bomb) => {
    if (boom) {
      bomb.boom()
    } else bomb.draw()
  })
  player.draw()
}

let movementSpeed = 1

let press = {
  up: undefined,
  down: undefined,
  left: undefined,
  right: undefined,
}

let boom = false

addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      if (!press.up) {
        press.up = setInterval(() => {
          if (moving.y) {
            player.position.y -= movementSpeed
          } else {
            player.position.y += 0
          }
        }, 1)
      }
      break
    case 's':
      if (!press.down) {
        press.down = setInterval(() => {
          if (moving.y) {
            player.position.y += movementSpeed
          } else {
            player.position.y -= 0
          }
        }, 1)
      }
      break
    case 'a':
      if (!press.left) {
        press.left = setInterval(() => {
          if (moving.x) {
            player.position.x -= movementSpeed
          } else {
            player.position.x += 0
          }
        }, 1)
      }
      break
    case 'd':
      if (!press.right) {
        press.right = setInterval(() => {
          if (moving.x) {
            player.position.x += movementSpeed
          } else {
            player.position.x -= 0
          }
        }, 1)
      }
      break
  }
})

addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      clearInterval(press.up)
      press.up = undefined
      break
    case 's':
      clearInterval(press.down)
      press.down = undefined
      break
    case 'a':
      clearInterval(press.left)
      press.left = undefined
    case 'd':
      clearInterval(press.right)
      press.right = undefined
      break
  }
})

let createBombs = undefined

bg.onload = () => {
  animate()

  createBombs = setInterval(() => {
    //pBomb.play()
    boom = false
    bombs.push(
      new Bomb({
        width: 96,
        height: 96,
        position: {
          x: player.position.x + player.width / 2 - 32,
          y: player.position.y + player.height / 2 - 32,
        },
      })
    )

    setTimeout(() => {
      boom = true
    }, 750)

    setTimeout(() => {
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: bombs[0],
        })
      ) {
        console.log('Go')
      }

      bombs.pop()
      //Audio should be less than 0.5s  pBomb.play()
    }, 1000)
  }, 1250)
}
