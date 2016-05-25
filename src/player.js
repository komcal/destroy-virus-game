class player {
  constructor(sizeX,sizeY) {
    this.x = 400
    this.y = 800-sizeY-10
    this.sizeX = sizeX
    this.sizeY = sizeY
  }
  create(ctx) {
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(this.x,this.y,this.sizeX,this.sizeY)
  }
}
export default player
