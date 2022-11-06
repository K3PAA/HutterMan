const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

class Enemy {
  constructor({ position, velocity, health, speed, width, height }) {
    this.position = position
    this.startingPosition = JSON.parse(JSON.stringify(position))
    this.velocity = velocity
    this.width = width
    this.height = height
    this.health = health

    this.speed = 2
  }

  draw() {
    c.fillStyle = 'purple'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    if (this.startingPosition.x >= canvas.width / 2)
      this.position.x -= this.speed
    else this.position.x += this.speed
  }
  //Enemie will follow Player
  follow() {}
}

export default Enemy
