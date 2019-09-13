import React from 'react'
import seedPalettes from './helpers/seedPalettes'
import getColorsLevels from './helpers/colorLevels'

import Palette from './palettes/Palette'

const paletteKey = 'flat-ui-colors-indian'
const currentPalette = {
  ...seedPalettes[paletteKey],
  id: paletteKey,
  colors: getColorsLevels(seedPalettes[paletteKey].colors)
}

function App () {
  return (
    <div className='container'>
      <Palette {...currentPalette} />
    </div>
  )
}

export default App
