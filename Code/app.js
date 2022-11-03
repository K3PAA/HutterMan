import boundaries from './map/collision.js'
import Drawing from './Classes/Drawing.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 960
canvas.height = 640

c.fillRect(0, 0, canvas.width, canvas.height)

const playerImage = new Image()
playerImage.src = './image/player.png'

const bg = new Image()
bg.src = './assets/Game.png'

const offset = {
  x: -600,
  y: -300,
}

const background = new Drawing({
  position: {
    x: offset.x,
    y: offset.y,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  image: bg,
})

const player = new Drawing({
  position: {
    x: canvas.width / 2 - playerImage.width / 2 / 2,
    y: canvas.height / 2 - playerImage.height / 2,
  },
  image: playerImage,
  frames: { max: 2 },
  times: 2,
})

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

let moving = {
  x: true,
  y: true,
}

function animate() {
  requestAnimationFrame(animate)

  background.draw()
  boundaries.forEach((boundary) => {
    boundary.draw()
  })
  player.draw()

  if (press.up) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          // ... create the same boundaty object but you can modify it
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
          // ... create the same boundaty object but you can modify it
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
          // ... create the same boundaty object but you can modify it
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
          // ... create the same boundaty object but you can modify it
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
}

bg.onload = () => {
  animate()
}
// We use spread operator so we don't have 2D array
const moveables = [background, ...boundaries]

let movementSpeed = 1

let press = {
  up: undefined,
  down: undefined,
  left: undefined,
  right: undefined,
}

addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      if (!press.up) {
        press.up = setInterval(() => {
          if (moving.y) {
            moveables.forEach((element) => {
              element.position.y += movementSpeed
            })
          } else {
            moveables.forEach((element) => {
              element.position.y -= movementSpeed
            })
          }
        }, 1)
      }
      break

    case 's':
      if (!press.down) {
        press.down = setInterval(() => {
          if (moving.y) {
            moveables.forEach((element) => {
              element.position.y -= movementSpeed
            })
          } else {
            moveables.forEach((element) => {
              element.position.y += movementSpeed
            })
          }
        }, 1)
      }
      break

    case 'a':
      if (!press.left) {
        press.left = setInterval(() => {
          if (moving.x) {
            moveables.forEach((element) => {
              element.position.x += movementSpeed
            })
          } else {
            moveables.forEach((element) => {
              element.position.x -= movementSpeed
            })
          }
        }, 1)
      }
      break

    case 'd':
      if (!press.right) {
        press.right = setInterval(() => {
          if (moving.x) {
            moveables.forEach((element) => {
              element.position.x -= movementSpeed
            })
          } else {
            moveables.forEach((element) => {
              element.position.x += movementSpeed
            })
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
