const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

class Bomb {
  constructor({ position, width, height, image }) {
    this.position = position
    this.width = width
    this.height = height
    this.image = image
    this.spacingX = 0
    this.spacingY = 0
  }

  draw() {
    c.drawImage(
      this.image,
      this.spacingX,
      this.spacingY,
      this.width - 32,
      this.height - 32,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  boom() {
    c.drawImage(
      this.image,
      this.spacingX,
      this.spacingY,
      this.width - 32,
      this.height - 32,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
}

export default Bomb
