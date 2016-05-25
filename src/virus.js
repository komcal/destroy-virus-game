import Stage from './stage'
var stage = new Stage()
class virus {
  constructor(x,y,size) {
    this.x = x
    this.runX = Math.floor(Math.random()*6+3)
    this.runY = Math.floor(Math.random()*6+3)
    this.y = y
    this.size =size
  }
  create(ctx) {
    ctx.beginPath()
    ctx.arc(Math.abs(this.x),Math.abs(this.y),this.size,0,2*Math.PI)
    ctx.stroke()
  }
  update() {
    this.x = this.setPosition(this.x, this.runX)
    this.y = this.setPosition(this.y, this.runY)
  }
  setPosition(len, run) {
    if(len >= stage.size-this.size || (len <0 && -len <this.size)){
      len *=-1
    }
    return len+run
  }
}
export default virus
