import data from './data.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

const boundaries = []
const bricks = []
const spp = []
const spe = []

const box = new Image()
box.src = 'assets/boxes.png'

const collisions = data[2]
const collisionMap = []

for (let i = 0; i < collisions.length; i += 32) {
  collisionMap.push(collisions.slice(i, i + 32))
}

class Boundary {
  static width = 32
  static height = 32
  constructor({ position, image = '', special, width, height }) {
    this.position = position
    //Bo exportowaliśmy na 2x zoom zdjęcie więc 32 x 2 = 64
    this.width = width
    this.height = height
    this.image = image
    this.special = special
    this.spacing = 0
  }

  draw() {
    if (this.image == '') {
      c.fillStyle = 'transparent'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    } else {
      c.drawImage(
        this.image,
        this.spacing,
        0,
        this.width,
        this.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    }
  }
}

collisionMap.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol == 1) {
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
    } else if (symbol == 2) {
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
    } // 3 = Player spawning Points
    else if (symbol == 3) {
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
    } // 4 = Enemy Spawning Points
    else if (symbol == 4) {
      spe.push(
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

export { boundaries, bricks, spp, spe }
