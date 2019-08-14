import chroma from 'chroma-js'

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
let newScale = []

function getRange (hexColor) {
  return [
    chroma(hexColor)
      .darken(1.4)
      .hex(),
    hexColor,
    '#fff'
  ]
}

function getScale (hexColor, colorsCount) {
  return chroma
    .scale(getRange(hexColor))
    .mode('lab')
    .colors(colorsCount)
    .reverse()
}

export default function getColorsLevels (baseColors) {
  let colors = {}

  for (const level of levels)
    colors[level] = []

  for (const color of baseColors) {
    newScale = getScale(color.color, levels.length)
    newScale.forEach( (scale, i) => {
      colors[levels[i]].push({
        id: color.name.toLowerCase().replace(/ /g, '-'),
        name: `${color.name} ${levels[i]}`,
        hex: scale,
        rgb: chroma(scale).css(),
        rgba: chroma(scale).css().replace('rgb', 'rgba').replace(')',',1.0)')
      })
    })
  }

  return colors
}
