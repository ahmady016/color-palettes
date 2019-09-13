import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import PaletteList from './palettes/PaletteList'
import Palette from './palettes/Palette'

import seedPalettes from './helpers/seedPalettes'
import getColorsLevels from './helpers/colorLevels'

const getPalette = (paletteId = 'flat-ui-colors-indian', genColors = false) => ({
  ...seedPalettes[paletteId],
  id: paletteId,
  colors: genColors ? getColorsLevels(seedPalettes[paletteId].colors) : seedPalettes[paletteId].colors
})

const getPaletteList = () => Object.keys(seedPalettes).map(key => getPalette(key))

function App () {
  return (
    <div className='container'>
      <BrowserRouter>
        <Switch>
          <Route path='/palette-list' render={() => <PaletteList palettes={getPaletteList()} />} />
          <Route path='/palette/:id' render={props => <Palette {...getPalette(props.match.params.id, true)} />} />
          <Redirect to='/palette-list' />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
