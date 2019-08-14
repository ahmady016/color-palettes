import React from 'react'
import styled from 'styled-components'

const PaletteWrapper = styled.div`
  height: 100%;
`
const PaletteColors = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`
const ColorBoxWrapper = styled.div`
  cursor: pointer;
  background-color: ${({ color }) => color};
  height: 25%;
  flex-basis: 20%;
`

function ColorBox ({ name, color }) {
  return (
    <ColorBoxWrapper color={color}>
      <span>{name}</span>
      <span>MORE</span>
    </ColorBoxWrapper>
  )
}

export default function Palette ({ name, emoji, colors }) {
  return (
    <PaletteWrapper className='palette'>
      {/* palette header */}
      <h3>{emoji} - {name}</h3>
      {/* palette color boxes */}
      <PaletteColors className='palette-colors'>
        {colors.map( color => ( <ColorBox {...color} /> ) )}
      </PaletteColors>
      {/* palette footer */}
      <h6>{emoji} - {name}</h6>
    </PaletteWrapper>
  )
}
