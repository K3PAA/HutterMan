import data from './data.js'
import Huts from '../Classes/Huts.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

const boundaries = []
const bricks = []
const pillars = []
const huts2 = []
const spp = []
const spe = []
const ice = []

const box = new Image()
box.src = 'assets/boxes.png'

const pillar = new Image()
pillar.src = 'assets/Pillar.png'

const collisions = data[0]
const collisionMap = []

for (let i = 0; i < collisions.length; i += 32) {
  collisionMap.push(collisions.slice(i, i + 32))
}

export class Boundary {
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
    if (symbol == 2) {
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

export { boundaries, bricks, spp, spe, pillars, ice, huts2 }
