const main = document.querySelector("main")

let stars = []
const mainCenter = [(main.clientWidth/2), (main.clientHeight/2)]
const mainRad = main.clientWidth / 2

let speed = 1.1

function radialSpawn(rad) {
  let theta = Math.random() * 2 * Math.PI
  if (rad == 0) {
    rad = Math.random() * mainRad
  } else {
    rad *= Math.random()
  }
  return [theta, rad]
}

async function radialSpread() {
  document.querySelectorAll(".line").forEach((line) => {
    main.removeChild(line)
  })
  stars.forEach( (starData) => {    
    let theta = starData[0]
    let rad   = starData[1]

    let start   = [Math.cos(theta) * rad, Math.sin(theta) * rad]
    
    starData[1] *= speed
    rad   = starData[1]
    let end   = [Math.cos(theta) * rad, Math.sin(theta) * rad]
    let line  = radialLine(start, end, theta)
    main.appendChild(line)
  })
}

async function killAndRespawn() {
  stars.forEach( (starData) => {
    let rad  = starData[1]
    if (rad >= mainRad) {
      stars.push(radialSpawn(50))
      stars = stars.filter(item => item != starData)
    }
  })
}

function radialLine(start, end, theta) {
  let line = document.createElement("div")
  line.classList = "line"
  line.style.width  = (1 * Math.sqrt(Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2))) + "px"
  line.style.left = (end[0] + mainCenter[0]) + "px"
  line.style.top  = (end[1] + mainCenter[1]) + "px"
  line.style.transform = "rotate(" + theta + "rad)"
  
  return line
}

for (let i = 0; i < 1000; i++) {
  stars.push(radialSpawn(0))
}

main.addEventListener("wheel", (event) => {
  speed += (event.deltaY - (event.deltaY % 100)) / 1000
})

setInterval(function() {
  radialSpread()
  killAndRespawn()
}, 1)
