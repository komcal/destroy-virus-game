class bullet {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.sizeX = 5
    this.sizeY = 40
  }
  create(ctx) {
    ctx.fillStyle = '#FFFF00'
    ctx.fillRect(this.x,this.y,this.sizeX,this.sizeY)
  }
  update() {
    this.y-=5
  }
}
export default bullet
