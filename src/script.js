import Virus from './virus'
import Stage from './stage'
import Player from './player'
var stage = new Stage()
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var player = new Player(40, 80)
var virus = []
for(let i=0 ; i<stage.number ; i++){
  virus[i] = new Virus(stage.startX*(i+1), stage.startY, 40)
}

stage.render(virus, player, ctx)
const intervalID = setInterval(() => {
  canvas.width = canvas.width
  virus.forEach(item => {item.update()})
  stage.render(virus, player, ctx)
}, 8)

document.onkeydown = ({keyCode}) => {
  if (keyCode == 37){
    (player.x >=0)? player.x-=20:player.x
  }
  else if(keyCode == 39){
    (player.x <=stage.size-player.sizeX)? player.x+=20:player.x
  }
}
