class stage {
  constructor() {
    this.number = 3
    this.startY = 100
    this.startX = 100
    this.size = 800
  }
  render(virus, player, bullets, ctx){
    virus.forEach(item => {
      item.create(ctx)
    })
    bullets.forEach(bullet => {
      bullet.create(ctx)
    })
    player.create(ctx)
  }
  next(){
    this.number++
  }
  check(player, virus, intervalID, canvas, ctx){
    if(virus.length == 0){
      console.log('win')
      clearInterval(intervalID)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return false
    }
    virus.forEach(item => {
      if((player.x >=Math.abs(item.x)-item.size && player.x+player.sizeX <=Math.abs(item.x)+item.size) && (player.y >=Math.abs(item.y)-item.size && player.y+player.sizeY <=Math.abs(item.y)+item.size*2)){
        console.log('lose')
        clearInterval(intervalID)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return false
      }
    })
    return true
  }
}
export default stage
