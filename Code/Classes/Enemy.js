const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

class Enemy {
  constructor({
    position,
    velocity,
    health,
    move,
    image,
    spacing,
    width,
    height,
  }) {
    this.position = position
    this.startingPosition = JSON.parse(JSON.stringify(position))
    this.velocity = velocity
    this.width = width
    this.height = height
    this.image = image
    this.spacing = spacing
    this.health = health
    this.move = move

    this.spacingY = 32
    this.speed = 2
  }

  draw() {
    if (this.image == '') {
      c.fillStyle = 'purple'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    } else {
      c.drawImage(
        this.image,
        this.spacing,
        this.spacingY,
        32,
        32,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    }
  }

  update() {
    this.draw()

    if (this.move == 'x') {
      if (this.startingPosition.x >= canvas.width / 2) {
        this.right = true
        this.position.x += -this.speed
      } else {
        this.right = false
        this.position.x += this.speed
      }
    }

    if (this.move == 'y') {
      if (this.startingPosition.x >= canvas.width / 2)
        this.position.y -= this.speed
      else this.position.y += this.speed
    }
  }
  //Enemie will follow Player
  follow() {}
}

export default Enemy
