const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

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

export default Boundary
