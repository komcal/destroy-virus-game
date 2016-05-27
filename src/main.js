
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
var intervalID = setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  stage.render(virus, player, bullets, ctx)
  let playing = stage.check(player,virus, intervalID, canvas, ctx) //check end game
  if(playing){ //not win not lose
    virus.forEach(item => { //check each virus overlap
      bullets.forEach(bullet => {
        if((bullet.x >=Math.abs(item.x)-item.size && bullet.x <=Math.abs(item.x)+item.size) && (bullet.y >=Math.abs(item.y)-item.size && bullet.y+bullet.sizeY <=Math.abs(item.y)+item.size*2)){
        //check if each bullet overlap virus
          bullets.splice(bullets.indexOf(bullet), 1) //delete bullet
          if(item.size <=20){ //check the virus can small?
            virus.splice(virus.indexOf(item),1) //delete virus
          } else { //virus can smaller, add more virus
            item.size/=2
            let v = new Virus(item.x, item.y, item.size)
            virus.push(v)
          }
        }
      })
      item.update() //update virus
    })
    bullets.forEach(bullet => { //update bullet
      if(bullet.y <= 0) {
        bullets.splice(bullets.indexOf(bullet), 1)
      } else {
        bullet.update()
      }
    })
  }
}, 8)

document.onkeydown = ({keyCode}) => {
  if (keyCode == 37) { //move left
    (player.x >=0)? player.x-=player.sizeX:player.x
  }
  else if(keyCode == 39) { //move right
    (player.x <=stage.size-player.sizeX)? player.x+=player.sizeX:player.x
  }
}
document.onkeyup = ({keyCode}) => {
  if(keyCode == 32) { //click spacebar shoot
    bullets.push(new Bullet(player.x+player.sizeX/2, player.y))
  }
}
