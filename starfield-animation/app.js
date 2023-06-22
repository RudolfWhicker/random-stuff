const canvas = document.getElementById("myCanvas")
const ctx    = canvas.getContext("2d")

let stars = []
const canvasCenter = [(canvas.clientWidth/2), (canvas.clientHeight/2)]
const canvasRad = canvas.clientWidth / 2

let speed = 1.1

function radialSpawn(rad) {
  let theta = Math.random() * 360
  if (rad == 0) {
    rad = Math.random() * canvasRad
  } else {
    rad *= Math.random()
  }
  return [theta, rad]
}

function drawLine(start, end, theta) {
  ctx.beginPath()
  ctx.save()

  ctx.lineWidth = 2

  ctx.strokeStyle = "#ffffff"
  ctx.translate(canvasCenter[0], canvasCenter[1])
  ctx.rotate(theta * Math.PI/180)
  ctx.moveTo(start[0], start[1])
  ctx.lineTo(end[0], end[1])
  ctx.stroke()

  ctx.restore()
}

function radialSpread() {
  ctx.clearRect(0, 0, 2*canvasRad, 2*canvasRad)
  stars.forEach( (starData) => {    
    let theta = starData[0]
    let rad   = starData[1]

    let start   = [Math.cos(theta * Math.PI / 180) * rad, Math.sin(theta * Math.PI / 180) * rad]
    
    starData[1] *= speed
    rad   = starData[1]
    let end   = [Math.cos(theta * Math.PI / 180) * rad, Math.sin(theta * Math.PI / 180) * rad]
    drawLine(start, end, theta)
  })
}

function killAndRespawn() {
  stars.forEach( (starData) => {
    let rad  = starData[1]
    if (rad >= canvasRad) {
      stars.push(radialSpawn(50))
      stars = stars.filter(item => item != starData)
    }
  })
}

for (let i = 0; i < 1000; i++) {
  stars.push(radialSpawn(0))
}

canvas.addEventListener("wheel", (event) => {
  speed += (event.deltaY - (event.deltaY % 100)) / 1000
  console.log(speed)
})

setInterval(function() {
  radialSpread()
  killAndRespawn()
}, 10)
