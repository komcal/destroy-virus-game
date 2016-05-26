
import Virus from './virus'
import Stage from './stage'
import Player from './player'
import Bullet from './bullet'
var stage = new Stage()
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var player = new Player(25, 50)
var virus = []
var bullets = []
for(let i=0 ; i<stage.number ; i++){
  virus[i] = new Virus(stage.startX*(i+1), stage.startY, 40)
}

stage.render(virus, player, bullets, ctx)
const intervalID = setInterval(() => {
  canvas.width = canvas.width
  virus.forEach(item => {
    for(let i=0 ; i<bullets.length ; i++){
      //(bullets[i].x >=item.x-item.size || bullets[i].x <=item.x+item.size) && (bullets[i].y >=item.y-item.size || bullets[i].y <=item.y+item.size)
      if((bullets[i].x >=Math.abs(item.x)-item.size && bullets[i].x <=Math.abs(item.x)+item.size) && (bullets[i].y >=Math.abs(item.y)-item.size && bullets[i].y+bullets[i].sizeY <=Math.abs(item.y)+item.size*2)){
        bullets.splice(i, 1)
        //delete ball
        console.log('ttt')
      }
    }
    item.update()
  })
  for(let i=0 ; i<bullets.length ; i++){
    if(bullets[i].y <= 0){
      bullets.splice(i, 1)
    }
    else{
      bullets[i].update()
    }
  }
  stage.render(virus, player, bullets, ctx)
}, 8)

document.onkeydown = ({keyCode}) => {
  if (keyCode == 37) { //left
    (player.x >=0)? player.x-=20:player.x
  }
  else if(keyCode == 39) { //right
    (player.x <=stage.size-player.sizeX)? player.x+=20:player.x
  }
}
document.onkeyup = ({keyCode}) => {
  if(keyCode == 32) { //space
    bullets.push(new Bullet(player.x+player.sizeX/2, player.y))
  }
}
