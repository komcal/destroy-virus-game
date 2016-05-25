import Virus from './virus'
import Stage from './stage'
var stage = new Stage()
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var virus = []
for(let i=1 ; i<=stage.number ; i++){
  virus[i] = new Virus(stage.startX*i, stage.startY, 40)
  virus[i].create(ctx)
}
