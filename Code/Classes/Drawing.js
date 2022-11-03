const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 960
canvas.height = 640

class Drawing {
  constructor({ position, velocity, image, frames = { max: 1 }, times = 1 }) {
    this.position = position
    this.velocity = velocity
    this.image = image
    this.frames = frames
    this.times = times

    this.image.onload = () => {
      this.width = (this.image.width / this.frames.max) * this.times
      this.height = this.image.height * this.times

      console.log(this.width)
      console.log(this.height)
    }
  }
  draw() {
    // c.drawImage(this.image, this.position.x, this.position.y)
    c.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.frames.max) * this.times,
      this.image.height * this.times
    )
  }
  update() {
    console.log('w')
    this.draw()
  }
}

export default Drawing
