const myCanvas  = document.getElementById("myCanvas")
const ctx       = myCanvas.getContext("2d")

let angleChange = 30

function draw(startX, startY, len, angle, branchWidth) {
  ctx.lineWidth = branchWidth
  ctx.beginPath()
  ctx.save()

  ctx.strokeStyle = "#8e6a55"
  
  ctx.translate(startX, startY)
  ctx.rotate(angle * Math.PI/180)
  ctx.moveTo(0, 0)
  ctx.lineTo(0, -len)
  ctx.stroke()

  ctx.shadowBlur  = 50
  ctx.shadowColor = "rgba(0,0,0,0.8)"
  
  if(len < 20) {
    ctx.restore()
    return
  }

  draw(0, -len, len*0.8,  angleChange, branchWidth*0.8)
  draw(0, -len, len*0.8, -angleChange, branchWidth*0.8)

  ctx.restore()
}

draw(450, 550, 120, 0, 8)

myCanvas.addEventListener("wheel", (event) => {
  ctx.clearRect(0, 0, myCanvas.clientWidth, myCanvas.clientHeight)
  angleChange += event.deltaY / 100
  draw(450, 550, 120, 0, 8)
})
