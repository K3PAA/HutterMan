const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

class Huts {
  constructor({ position }) {
    this.position = position
    this.width = 32
    this.height = 32
  }

  draw() {
    c.fillStyle = 'green'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

export default Huts
