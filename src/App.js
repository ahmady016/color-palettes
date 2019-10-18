import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import PaletteList from './palettes/PaletteList'
import Palette from './palettes/Palette'

import { getPaletteList, getPaletteColors, getPaletteColor } from './helpers/seedPalettes'
import Sidebar from './Sidebar'

function App () {
  return (
    <div className='container'>
      <BrowserRouter>
        <Switch>
          <Route path='/palette-list'
            render={props => <PaletteList {...props} palettes={getPaletteList()} />} />
          <Route path='/palette/new'
            render={props => <Sidebar {...props} /> } />
          <Route path='/palette/:id/:colorId'
            render={props => <Palette {...props} {...getPaletteColor(props.match.params.id, props.match.params.colorId)} />} />
          <Route path='/palette/:id'
            render={props => <Palette {...props} {...getPaletteColors(props.match.params.id, true)} />} />
          <Redirect to='/palette-list' />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
