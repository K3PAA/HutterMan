const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

class Player {
  constructor({ position, velocity, image }) {
    this.position = position
    this.velocity = velocity
    this.image = image
    this.size = 1.4

    this.width = 16 * this.size
    this.height = 32 * this.size
  }
  draw() {
    // c.drawImage(this.image, this.position.x, this.position.y)
    c.drawImage(
      this.image,
      8,
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
    this.draw()
  }
}

export default Player
