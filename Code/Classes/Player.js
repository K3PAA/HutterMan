const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

const heart = new Image()
heart.src = 'assets/heart.png'

class Player {
  constructor({ position, velocity, image, health, spacing, toCollect }) {
    this.position = position
    this.velocity = velocity
    this.image = image
    this.health = health
    this.size = 1.4
    this.toCollect = toCollect
    this.Interval = undefined

    this.width = 16 * this.size
    this.height = 32 * this.size

    this.collected = 0
    this.y = 32
    this.spacing = spacing
  }
  draw() {
    // c.drawImage(this.image, this.position.x, this.position.y)
    c.drawImage(
      this.image,
      this.spacing,
      0,
      this.width / this.size,
      this.height / this.size,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    for (let i = 0; i < this.health; i++) {
      c.drawImage(heart, 0, 0, 254, 254, i * 34 + 10, 10, 32, 32)
    }

    this.draw()
  }
}

export default Player
