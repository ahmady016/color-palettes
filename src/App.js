import React from 'react'
import seedPalettes from './helpers/seedPalettes'

import Palette from './palettes/Palette'

function App() {
  return (
    <>
      <h1>color palettes</h1>
      <div className='container h-75'>
        <Palette {...seedPalettes['flat-ui-colors-indian']} />
      </div>
    </>
  )
}

export default App
