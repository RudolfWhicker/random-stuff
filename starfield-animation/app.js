const main = document.querySelector("main")

let stars = []
const mainCenter = [(main.clientWidth/2), (main.clientHeight/2)]
const mainRad = main.clientWidth / 2

console.log(mainCenter)

function radialSpawn(rad) {
  let theta = Math.random() * 2 * Math.PI
  if (rad == 0) {
    rad = Math.random() * mainRad
  } else {
    rad *= Math.random()
  }
  return [Math.floor(mainCenter[0] + (Math.cos(theta) * rad)), Math.floor(mainCenter[1] + (Math.sin(theta) * rad)), theta, rad]
}

function radialSpread() {
  stars.forEach( (starData) => {
    let star  = starData[0]
    let theta = starData[1]
    starData[2] *= 1.05
    let rad = starData[2]
    star.style.left = Math.floor(mainCenter[0] + (Math.cos(theta) * rad)) + "px"
    star.style.top  = Math.floor(mainCenter[1] + (Math.sin(theta) * rad)) + "px"  
  })
}

function killAndRespawn() {
  stars.forEach( (starData) => {
    let rad  = starData[2]
    if (rad >= mainRad) {
      coordinates = radialSpawn(50)
      let star = document.createElement("div")
      star.classList = "star"
      star.style.left = coordinates[0] + "px"
      star.style.top  = coordinates[1] + "px"
      stars.push([star, coordinates[2], coordinates[3]])
      main.appendChild(star)
      stars = stars.filter(item => item != starData)
      main.removeChild(starData[0])
    }
  })
}

for (let i = 0; i < 1000; i++) {
  coordinates = radialSpawn(0)
  let star = document.createElement("div")
  star.classList = "star"
  star.style.left = coordinates[0] + "px"
  star.style.top  = coordinates[1] + "px"
  stars.push([star, coordinates[2], coordinates[3]])
  main.appendChild(star)
}

setInterval(function() {
  radialSpread()
  killAndRespawn()
}, 1)
