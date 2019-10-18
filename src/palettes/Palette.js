import React from 'react'
import { Link } from 'react-router-dom'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Icon from '@material-ui/core/Icon'

import colorFormats from '../helpers/colorFormats'
import { isDarkColor, isLightColor } from '../helpers/colorLevels'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import '../rc-slider.css'

//#region styled components
const PaletteWrapper = styled.div`
  height: 100%;
`
const PaletteHeaderWrapper = styled.div`
  height: 60px;
  margin-bottom: 0.4rem;
  padding-right: 1rem;
  box-shadow: 1px 1px 10px #151515;
  background-color: #d1d1d1;
  color: #444;
  font-weight: 600;
`
const HomeButton = styled(Button)`
  height: 100%;
  border-radius: 0 !important;
`
const PaletteColors = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`
const ColorFormatSelect = styled(Select)`
  width: 15rem;
`
const ColorBoxInnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  font-size: 0.8rem;
`
const ColorBoxContent = styled(ColorBoxInnerWrapper)`
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  bottom: 0;
`
const ColorName = styled.div`
  text-transform: uppercase;
  margin-left: 0.5rem;
  color: ${({ isDarkColor }) => isDarkColor ? '#fff' : '#000'};
`
const ButtonMore = styled(Button)`
  border-radius: 0 !important;
`
const ColorBoxCopyWrapper = styled(ColorBoxInnerWrapper)`
  height: 100%;
  flex-basis: 40%;
  justify-content: center;
  align-items: center;
  opacity: 0;
  z-index: 1;
`
const ColorBoxWrapper = styled.div`
  position: relative;
  background-color: ${ ({ color }) => color };
  flex-basis: ${ ({ isOneColor }) => isOneColor ? '20%' : '25%' };
  height: ${ ({ isOneColor }) => isOneColor ? '15rem' : '10rem' };
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
  opacity: 0;
  transform: scale(0);
  z-index: 999;
  color: ${({ isLightColor }) => isLightColor ? '#000' : '#fff'};
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
  background-color: ${({ isLightColor }) => isLightColor ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.2)'};
  font-weight: 400;
  text-shadow: 1px 2px ${({ isLightColor }) => isLightColor ? '#fff' : '#000'};
  text-align: center;
  text-transform: uppercase;
`
const CopyMessageColor = styled.div`
  font-size: 1.5rem;
  font-weight: 200;
`
const PaletteFooter = styled.footer`
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #ddd;
  color: #444;
  font-weight: 600;
  margin-top: 0.3rem;
  box-shadow: 1px 1px 10px #151515;
  & > .emoji {
    font-size: 1.5rem;
    margin-left: 0.5rem;
  }
`
//#endregion

function PaletteHeader ({ paletteName, paletteEmoji, level, setLevel, colorFormat, setColorFormat, colorName }) {
  return (
    <PaletteHeaderWrapper className='flex-between'>
      <HomeButton size='large' variant='contained'>
        <Icon className='mr-05'>home</Icon>
        <Link className='default-link' to='/palette-list/'>Palette List</Link>
      </HomeButton>
      <h3>{paletteEmoji} {paletteName} {colorName && `- ${colorName}`}</h3>
      <div>
        <InputLabel htmlFor='color-format'>Color Format</InputLabel>
        <ColorFormatSelect
          value={colorFormat}
          onChange={e => setColorFormat(e.target.value)}
          inputProps={{
            id: 'color-format',
            name: 'color-format'
          }}
        >
          {colorFormats.map(({ value, text }) => (
            <MenuItem key={value} value={value}>{value.toUpperCase()} - {text}</MenuItem>
          ))}
        </ColorFormatSelect>
      </div>
      { !colorName &&
        <div>
          <span>Level: {level}</span>
          <Slider
            defaultValue={level}
            step={100}
            min={100}
            max={900}
            onAfterChange={setLevel}
          />
        </div>
      }
    </PaletteHeaderWrapper>
  )
}

function ColorBox ({ paletteId, colorId, name, color, isOneColor }) {
  const _isLightColor = isLightColor(color)
  const _isDarkColor = isDarkColor(color)

  const [copied, setCopied] = React.useState(false)

  const doCopy = React.useCallback( () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [])

  return (
    <ColorBoxWrapper color={color} isOneColor={isOneColor}>
      <ColorBoxContent>
        <ColorName isDarkColor={_isDarkColor}>{name}</ColorName>
        { !isOneColor &&
          <ButtonMore size='small' variant='contained'>
            <Link className='default-link' to={`/palette/${paletteId}/${colorId}`}>MORE</Link>
          </ButtonMore>
        }
      </ColorBoxContent>
      <ColorBoxCopyWrapper>
        <CopyToClipboard text={color} onCopy={doCopy}>
          <Button size='large' variant='contained'>COPY</Button>
        </CopyToClipboard>
      </ColorBoxCopyWrapper>
      <CopyOverlay className={copied ? 'active' : ''} color={color} />
      <CopyMessage className={copied ? 'active' : ''} isLightColor={_isLightColor}>
        <CopyMessageText isLightColor={_isLightColor}>Copied</CopyMessageText>
        <CopyMessageColor>{color}</CopyMessageColor>
      </CopyMessage>
    </ColorBoxWrapper>
  )
}

function Palette ({ id, name, emoji, colors, history }) {
  console.log("TCL: Palette -> colors", colors)
  const isOneColor = Array.isArray(colors)
  const [currentLevel, setCurrentLevel] = React.useState(500)
  const [colorFormat, setColorFormat] = React.useState('hex')
  const [snackbarOpened, setSnackbarOpened] = React.useState(false)
  const handleColorFormatChange = React.useCallback(
    (value) => {
      setColorFormat(value)
      setSnackbarOpened(true)
    },
    [setColorFormat, setSnackbarOpened]
  )
  const handleSnackbarClose = React.useCallback(
    () => setSnackbarOpened(false),
    [setSnackbarOpened]
  )
  return (
    <>
      <PaletteWrapper className='palette'>
        {/* palette header */}
        <PaletteHeader
          paletteName={name}
          paletteEmoji={emoji}
          level={currentLevel}
          setLevel={setCurrentLevel}
          colorFormat={colorFormat}
          setColorFormat={handleColorFormatChange}
          colorName={isOneColor ? colors[0].name.split(' ')[0] : ''}
        />
        {/* palette color boxes */}
        {isOneColor
          ? <PaletteColors className='palette-colors'>
              {[
                ...colors.map(color =>
                  <ColorBox key={color.name} isOneColor={isOneColor} paletteId={id} colorId={color.id} name={color.name} color={color[colorFormat]} />
                ),
                <ColorBoxWrapper className='flex-center' key='go-back' isOneColor={isOneColor}>
                  <Button size='large' color='primary' variant='contained' onClick={e => history.goBack()}>
                    <Icon className='mr-05'>arrow_back</Icon>
                    <span>GO BACK</span>
                  </Button>
                </ColorBoxWrapper>
              ]}
            </PaletteColors>
          : <PaletteColors className='palette-colors'>
              {colors[currentLevel].map(color =>
                <ColorBox key={color.name} isOneColor={isOneColor} paletteId={id} colorId={color.id} name={color.name} color={color[colorFormat]} />
              )}
            </PaletteColors>
        }
        {/* palette footer */}
        <PaletteFooter className='palette-footer'>
          <span>{name}</span>
          <span className='emoji'>{emoji}</span>
        </PaletteFooter>
      </PaletteWrapper>
      <Snackbar
        open={snackbarOpened}
        onClose={handleSnackbarClose}
        autoHideDuration={500000}
        message={<span id="message-id">Color Format Changed To {colorFormat.toUpperCase()}</span>}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        action={
          <IconButton
            key='close'
            aria-label='close'
            color='inherit'
            onClick={handleSnackbarClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </>
  );
}

export default Palette
