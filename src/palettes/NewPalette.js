import React from 'react'

import Sidebar from '../Sidebar'

function NewPaletteForm() {
  return (
    <p className='flex-b-75'>New Palette Form</p>
  )
}

function AddColorForm() {
  return (
    <p>Add Color Form</p>
  )
}

function ColorBoxes() {
  return (
    <p>Color Boxes</p>
  )
}

function NewPalette() {
  return (
    <Sidebar
      HeaderSection={NewPaletteForm}
      SidebarSection={AddColorForm}
      MainSection={ColorBoxes}
    />
  )
}

export default NewPalette
