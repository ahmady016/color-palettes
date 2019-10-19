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

function getColorInfo(colorName, colorHex, index) {
  return {
    id: colorName.toLowerCase().replace(/ /g, '-'),
    name: `${colorName} ${levels[index]}`,
    hex: colorHex,
    rgb: chroma(colorHex).css(),
    rgba: chroma(colorHex).css().replace('rgb', 'rgba').replace(')',',1.0)')
  }
}

export const isDarkColor = (hex) => chroma(hex).luminance() <= 0.08
export const isLightColor = (hex) => chroma(hex).luminance() >= 0.6
export const getColorName = (hex) => chroma(hex).name()

export const getRandomColor = () => {
  const baseChars = '0123456789abcdef'
  let result = '#'
  for (var i = 0; i < 6; i++)
    result += baseChars.charAt(Math.floor(Math.random() * 16))
  return result
}

export const getColorLevels = (colorName, hexColor) => {
  return getScale(hexColor, levels.length)
          .map((scale, i) => getColorInfo(colorName, scale, i))
          .slice(1)
}

export default function getColorsLevels (baseColors) {
  let colors = {}

  for (const level of levels)
    colors[level] = []

  for (const color of baseColors) {
    newScale = getScale(color.color, levels.length)
    newScale.forEach( (scale, i) => colors[levels[i]].push(getColorInfo(color.name, scale, i)) )
  }

  return colors
}
