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
    <>
      <h1>color palettes</h1>
      <div className='container h-75'>
        <Palette {...currentPalette} />
      </div>
    </>
  )
}

export default App
