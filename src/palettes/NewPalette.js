import React from 'react'

import styled from 'styled-components'
import clsx from 'clsx'

import { ChromePicker } from 'react-color'
import { Picker as EmojiPicker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

import Button from '@material-ui/core/Button'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { isDarkColor, getColorName, getRandomColor } from '../helpers/colorLevels'
import Sidebar from '../Sidebar'

// #region app const and variables
const _initialColors = [
  { name: getColorName('#00ff00'), color: '#00ff00' },
  { name: getColorName('#ff0000'), color: '#ff0000' },
  { name: getColorName('#0000ff'), color: '#0000ff' }
]
const createNewPalette = (paletteName, paletteEmoji, colors) => {
  return {
    id: paletteName.toLowerCase().replace(/ /g, '-'),
    name: paletteName,
    emoji: paletteEmoji,
    colors
  }
}
// #endregion

//#region styled components
const EmojiWrapper = styled.div`
  position: relative;
  display: contents;
`
const EmojiIcon = styled(EmojiEmotionsOutlinedIcon)`
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: ${ ({ emojiInvalid }) => emojiInvalid ? '22px' : '2px'};
`
const AddColorButton = styled(Button)`
  flex-basis: 100%;
  border-radius: 0 !important;
  margin-top: 0.3rem !important;
  background-color: ${ ({ bgColor }) => bgColor } !important;
  color: ${ ({ bgColor }) => isDarkColor(bgColor) ? '#fff' : '#000' } !important;
`
const ColorBoxesWrapper = styled.div`
  width: 100%;
  height: 85vh;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: repeat(4, 25%);
`
const ColorBoxWrapper = styled.div`
  background-color: ${ ({ color }) => color };
  color: ${ ({ color }) => isDarkColor(color) ? '#fff' : '#000' };
  display: flex;
  justify-content: center;
  align-items: center;
`
//#endregion

function NewPaletteForm({ opened, colors, setColors, palettes, setPalettes, history }) {
  const [paletteName, setPaletteName] = React.useState('')
  const [paletteEmoji, setPaletteEmoji] = React.useState('')

  const [emojiPickerOpened, setEmojiPickerOpened] = React.useState(false)
  const [emojiInvalid, setEmojiInvalid] = React.useState(false)

  //#region Form Handlers
  const addNewPalette = e => {
    setPalettes( palettes => [...palettes, createNewPalette(paletteName, paletteEmoji, colors)] )
    history.push('/palette-list')
  }
  const onError = errors => {
    errors = errors.map( error => ({ field: error.props.name, error: error.getErrorMessage() }) )
    console.log("TCL: NewPaletteForm -> onError", errors)
  }
  const emojiChanged = selectedEmoji => {
    setPaletteEmoji(selectedEmoji.native)
    setEmojiPickerOpened(false)
    setEmojiInvalid(palettes.some( ({ emoji }) => emoji === selectedEmoji.native ))
  }
  //#endregion

  //#region Add Form Validation Rules
  React.useEffect(
    () => {
      ValidatorForm.addValidationRule(
        'newPaletteName',
        value => palettes.every( ({ name }) => name.toLowerCase() !== value.toLowerCase())
      )
      ValidatorForm.addValidationRule(
        'newPaletteEmoji',
        value => palettes.every( ({ emoji }) => emoji !== value)
      )
    },
    [palettes]
  )
  //#endregion

  return (
    <ValidatorForm
      className={clsx(opened ? 'w-100 px-1' : 'flex-b-75','flex-between-end')}
      onSubmit={addNewPalette}
      onError={onError}
    >
      <TextValidator
        className='flex-b-25'
        label='Palette Name'
        name='paletteName'
        value={paletteName}
        onChange={e => setPaletteName(e.target.value)}
        validators={['required','newPaletteName']}
        errorMessages={['Enter a Palette Name', 'Name is Taken']}
      />
      <EmojiWrapper className='flex-b-25 flex-between-end'>
        <TextValidator
          className='pointer'
          label='Palette Emoji'
          name='paletteEmoji'
          value={paletteEmoji}
          readOnly
          validators={['required','newPaletteEmoji']}
          errorMessages={['Enter a Palette Emoji', 'Emoji already used']}
        />
        <EmojiIcon
          fontSize='large'
          emojiInvalid={emojiInvalid}
          onClick={_ => setEmojiPickerOpened(opened => !opened)}
        />
        <EmojiPicker
          style={{ position: 'absolute', top: 50, left: 0, display: emojiPickerOpened ? 'block' : 'none' }}
          onSelect={emojiChanged}
        />
      </EmojiWrapper>
      <Button
        type='submit'
        className='flex-b-20 border-r-0'
        variant='contained'
        color='primary'
      >
        <SaveIcon className='mr-05' />
        Save All
      </Button>
      <Button
        className='flex-b-20 border-r-0'
        variant='contained'
        color='secondary'
        onClick={e => setColors([])}
      >
        <DeleteIcon className='mr-05' />
        Clear All
      </Button>
    </ValidatorForm>
  )
}

function AddColorForm({ selectedColor, setSelectedColor, colors, setColors }) {
  const paletteFilled = colors.length === 20
  const [colorName, setColorName] = React.useState(selectedColor.name)

  //#region Form Handlers
  const onColorPicked = newColor => {
    let _colorName = getColorName(newColor.hex)
    setColorName(_colorName)
    setSelectedColor({ name: _colorName, color: newColor.hex })
  }
  const addNewColor = _ => {
    if(!paletteFilled)
      setColors( prevColors => [...prevColors, { name: colorName, color: selectedColor.color }] )
  }
  //#endregion

  //#region Add Form Validation Rules
  React.useEffect(
    () => {
      ValidatorForm.addValidationRule(
        'isNewName',
        value => colors.every( ({ name }) => name.toLowerCase() !== value.toLowerCase())
      )
      ValidatorForm.addValidationRule(
        'isNewValue',
        value => colors.every( ({ color }) => color !== value)
      )
    },
    [colors]
  )
  //#endregion

  return (
    <div className='flex-column-around-center h-100'>
      <Button
        className='w-80 border-r-0'
        variant='contained'
        color='default'
        size='large'
        onClick={ _ => onColorPicked({ hex: getRandomColor() }) }
        >
          Random Color
      </Button>
      <ChromePicker
        className='w-80'
        color={selectedColor.color}
        onChangeComplete={onColorPicked}
      />
      <ValidatorForm
        className='w-80 flex-between flex-wrap'
        onSubmit={addNewColor}
        onError={console.log}
      >
        <TextValidator
          className='flex-b-45'
          label='Color Value'
          name='colorValue'
          value={selectedColor.color}
          validators={['required','isNewValue']}
          errorMessages={['Enter a Color Name', 'Color already used']}
          readOnly
        />
        <TextValidator
          className='flex-b-45'
          label='Color Name'
          name='colorName'
          value={colorName}
          onChange={e => setColorName(e.target.value)}
          validators={['required', 'isNewName']}
          errorMessages={['Enter a Color Name', 'Name is Taken']}
        />
        <AddColorButton
          type='submit'
          variant='contained'
          size='large'
          bgColor={selectedColor.color}
          disabled={paletteFilled}
        >
          { paletteFilled
              ? 'Palette Filled'
              : 'Add Color'
          }
        </AddColorButton>
      </ValidatorForm>
    </div>
  )
}

function ColorBoxes({ colors }) {
  return (
    <ColorBoxesWrapper>
      {colors.map(({name, color}) => (
        <ColorBoxWrapper key={name} color={color}>
          <span>{name}</span>
        </ColorBoxWrapper>
      ))}
    </ColorBoxesWrapper>
  )
}

function NewPalette({ palettes, setPalettes, history }) {
  const [colors, setColors] = React.useState(_initialColors)
  const [selectedColor, setSelectedColor] = React.useState(colors[0])
  return (
    <Sidebar
      sidebarTitle='Design Your Palette'
      sidebarButtonText='Add Colors'
      renderHeaderSection={(opened) => () => <NewPaletteForm opened={opened} colors={colors} setColors={setColors} palettes={palettes} setPalettes={setPalettes} history={history} />}
      renderSidebarSection={() => <AddColorForm colors={colors} setColors={setColors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />}
      renderMainSection={() => <ColorBoxes colors={colors} />}
    />
  )
}

export default NewPalette
