class virus {
  constructor(x,y,size) {
    this.x = x
    this.y = y
    this.size =size
  }
  create(ctx) {
    ctx.beginPath()
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI)
    ctx.stroke()
  }
}
export default virus 
