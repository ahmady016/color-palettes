import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import PaletteList from './palettes/PaletteList'
import Palette from './palettes/Palette'

import { getPaletteList, getPaletteColors, getPaletteColor } from './helpers/seedPalettes'
import NewPalette from './palettes/NewPalette'

function App () {
  const [palettes, setPalettes] = React.useState(() => getPaletteList())
  return (
    <div className='container'>
      <BrowserRouter>
        <Switch>
          <Route path='/palette-list'
            render={props => <PaletteList {...props} palettes={palettes} />} />
          <Route path='/palette/new'
            render={props => <NewPalette {...props} palettes={palettes} setPalettes={setPalettes} /> } />
          <Route path='/palette/:id/:colorId'
            render={props => <Palette {...props} {...getPaletteColor(props.match.params.id, props.match.params.colorId, palettes)} />} />
          <Route path='/palette/:id'
            render={props => <Palette {...props} {...getPaletteColors(props.match.params.id, true, palettes)} />} />
          <Redirect to='/palette-list' />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
