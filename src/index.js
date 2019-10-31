import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

//#region if not exists then seed the LS with seedPalettesAsArray
import LS from './helpers/localStorage'
import { seedPalettesAsArray } from './helpers/seedPalettes'

let existingPalettes = LS.get('PALETTES')
if(!existingPalettes)
  LS.set('PALETTES', seedPalettesAsArray)
//#endregion

ReactDOM.render(<App />, document.getElementById('root'))
