class stage {
  constructor() {
    this.number = 1
    this.startY = 100
    this.startX = 100
    this.size = 800
  }
  render(virus, player, bullet, ctx){
    for(let i = 0 ; i < this.number ; i++){
      virus[i].create(ctx)
    }
    for(let i = 0 ; i< bullet.length ; i++){
      bullet[i].create(ctx)
    }
    player.create(ctx)
  }
  next(){
    this.number++
  }
}
export default stage
