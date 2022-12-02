const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

class Huts {
  constructor({ position, image }) {
    this.position = position
    this.width = 32
    this.height = 32
    this.image = image
    this.spacing = 0
  }

  draw() {
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

export default Huts
