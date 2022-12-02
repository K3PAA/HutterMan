let lastKey = undefined
let press = {
  up: undefined,
  down: undefined,
  left: undefined,
  right: undefined,
}
let movementSpeed = 3

export function move(e) {
  if (e.key == 'd') {
    lastKey = 'd'
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

export function stop(e) {
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
