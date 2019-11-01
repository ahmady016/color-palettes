import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import PaletteList from './palettes/PaletteList'
import NewPalette from './palettes/NewPalette'
import Palette from './palettes/Palette'

import LS from './helpers/localStorage'
import { getPaletteColors, getPaletteColor } from './helpers/seedPalettes'

function App () {
  const [palettes, setPalettes] = React.useState(() => LS.get('PALETTES'))
  React.useEffect(
    () => LS.set('PALETTES', palettes),
    [palettes]
  )
  return (
    <div className='container'>
      <BrowserRouter>
        <Switch>
          <Route path='/palette-list'
            render={props => <PaletteList {...props} palettes={palettes} setPalettes={setPalettes} />} />
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
