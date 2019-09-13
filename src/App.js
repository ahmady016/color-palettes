import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import PaletteList from './palettes/PaletteList'
import Palette from './palettes/Palette'

import { getPaletteList, getPalette } from './helpers/seedPalettes'

function App () {
  return (
    <div className='container'>
      <BrowserRouter>
        <Switch>
          <Route path='/palette-list' render={() => <PaletteList palettes={getPaletteList()} />} />
          <Route path='/palette/:id' render={props => <Palette history={props.history} {...getPalette(props.match.params.id, true)} />} />
          <Redirect to='/palette-list' />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
