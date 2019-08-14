import React from 'react'
import styled, { css } from 'styled-components'
import Button from '@material-ui/core/Button'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
  z-index: 1;
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
const CopyOverlay = styled.div`
  background-color: ${({ color }) => color};
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 0;
  transition: transform 0.6s ease-in-out;
  &.active {
    opacity: 1;
    z-index: 99;
    position: absolute;
    transform: scale(10);
  }
`
const CopyMessage = styled.div`
  position: fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  color: #fff;
  opacity: 0;
  transform: scale(0.1);
  z-index: 999;
  &.active {
    opacity: 1;
    transform: scale(1);
    transition: all 0.6s 0.3s ease-in-out;
  }
`
const CopyMessageText = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: rgba(255,255,255,0.2);
  font-weight: 400;
  text-shadow: 1px 2px #000;
  text-align: center;
  text-transform: uppercase;
`
const CopyMessageColor = styled.div`
  font-size: 2rem;
  font-weight: 100;
`

function ColorBox ({ name, color }) {
  const [copied, setCopied] = React.useState(false)
  const doCopy = React.useCallback( () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [])
  return (
    <ColorBoxWrapper color={color}>
      <ColorBoxContent>
        <ColorName>{name}</ColorName>
        <ButtonMore size='small' variant='contained'>MORE</ButtonMore>
      </ColorBoxContent>
      <ColorBoxCopyWrapper>
        <CopyToClipboard text={color} onCopy={doCopy}>
          <Button size='large' variant='contained'>COPY</Button>
        </CopyToClipboard>
      </ColorBoxCopyWrapper>
      <CopyOverlay className={copied ? 'active' : ''} color={color} />
      <CopyMessage className={copied ? 'active' : ''}>
        <CopyMessageText>Copied</CopyMessageText>
        <CopyMessageColor>{color}</CopyMessageColor>
      </CopyMessage>
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
