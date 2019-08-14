import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

const PaletteWrapper = styled.div`
  height: 100%;
`
const PaletteColors = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`
const ColorBoxInnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 0.8rem;
`
const ColorBoxContent = styled(ColorBoxInnerWrapper)`
  justify-content: space-between;
  align-items: flex-end;
`
const ColorName = styled.div`
  text-transform: uppercase;
`
const ButtonMore = styled(Button)`
  border-radius: 0 !important;
`
const ColorBoxCopyWrapper = styled(ColorBoxInnerWrapper)`
  flex-basis: 40%;
  justify-content: center;
  align-items: center;
  opacity: 0;
`
const ColorBoxWrapper = styled.div`
  position: relative;
  cursor: pointer;
  background-color: ${({ color }) => color};
  flex-basis: 25%;
  height: 40%;
  &:hover ${ColorBoxCopyWrapper} {
    opacity: 1;
    transition: opacity 0.5s ease-out;
  }
`

function ColorBox ({ name, color }) {
  return (
    <ColorBoxWrapper color={color}>
      <ColorBoxContent>
        <ColorName>{name}</ColorName>
        <ButtonMore size='small' variant='contained'>MORE</ButtonMore>
      </ColorBoxContent>
      <ColorBoxCopyWrapper>
        <Button variant='contained'>COPY</Button>
      </ColorBoxCopyWrapper>
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
