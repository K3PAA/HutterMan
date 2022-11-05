const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

class Bomb {
  constructor({ position, width, height }) {
    this.position = position
    this.width = width
    this.height = height
  }

  draw() {
    c.fillStyle = 'black'
    c.fillRect(
      this.position.x + 32,
      this.position.y + 32,
      this.width - 64,
      this.height - 64
    )
  }

  boom() {
    c.fillStyle = 'orange'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

export default Bomb
