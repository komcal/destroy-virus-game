class stage {
  constructor() {
    this.number = 1
    this.startY = 100
    this.startX = 100
    this.size = 800
    this.ballSize = [[40,40],[40,40,40],[40,80,80],[40,40,40,80],[40,40,80,80,80]]
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
  check(player, virus, intervalID, canvas, ctx, newgame){
    if(virus.length == 0){
      return true
    }
    virus.forEach(item => { //lose
      if((player.x >=Math.abs(item.x)-item.size && player.x+player.sizeX <=Math.abs(item.x)+item.size) && (player.y >=Math.abs(item.y)-item.size && player.y+player.sizeY <=Math.abs(item.y)+item.size*2)){
        console.log('lose')
        clearInterval(intervalID)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        alert('YOU LOSE!!!')
        return false
      }
    })
    return false
  }
}
export default stage
