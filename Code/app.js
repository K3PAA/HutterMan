const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 960
canvas.height = 640

c.fillRect(0, 0, canvas.width, canvas.height)

const bg = new Image()
bg.src = './assets/Game.png'

bg.onload = () => {
  animate()
}

let keys = {
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
}

class Drawing {
  constructor({ position, velocity, image }) {
    this.position = position
    this.velocity = velocity
    this.image = image
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

const background = new Drawing({
  position: {
    x: -600,
    y: -300,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  image: bg,
})

let lastKey = ''
addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break

    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break

    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break

    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
  }
})

addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break

    case 's':
      keys.s.pressed = false
      break

    case 'a':
      keys.a.pressed = false
      break

    case 'd':
      keys.d.pressed = false
      break
  }
})

function animate() {
  if (keys.w.pressed && lastKey == 'w') background.position.y += 5
  else if (keys.s.pressed && lastKey == 's') background.position.y += -5
  else if (keys.a.pressed && lastKey == 'a') background.position.x += 5
  else if (keys.d.pressed && lastKey == 'd') background.position.x += -5

  background.update()
  c.fillRect(canvas.width / 2, canvas.height / 2, 64, 64)

  requestAnimationFrame(animate)
}
