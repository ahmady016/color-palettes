import React from 'react'

import styled from 'styled-components'
import clsx from 'clsx'

import { SortableContainer, SortableElement, arrayMove  } from 'react-sortable-hoc'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { ChromePicker } from 'react-color'
import { Picker as EmojiPicker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'

import { _initialPaletteColors, createNewPalette } from '../helpers/seedPalettes'
import { isDarkColor, getRandomColor, getColorName } from '../helpers/colorLevels'

import Sidebar from '../Sidebar'

//#region styled components
const ClearAllWrapper = styled.div`
  flex-basis: 85%;
  position: relative;
  left: 7%;
  display: flex;
  justify-content: center;
`
const EmojiWrapper = styled.div`
  position: relative;
  display: contents;
`
const EmojiIcon = styled(EmojiEmotionsOutlinedIcon)`
  transform: scale(0.8);
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: ${ ({ emojiInvalid }) => emojiInvalid ? '20px' : '0'};
`
const AddColorButton = styled(Button)`
  flex-basis: 100%;
  border-radius: 0 !important;
  margin-top: 0.3rem !important;
  background-color: ${ ({ bgColor }) => bgColor } !important;
  color: ${ ({ bgColor }) => isDarkColor(bgColor) ? '#fff' : '#000' } !important;
`
const ColorBoxesWrapper = styled.div`
  cursor: grab;
  width: 100%;
  height: 85vh;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: repeat(4, 25%);
`
const ColorBoxWrapper = styled.div`
  position: relative;
  background-color: ${ ({ color }) => color };
  color: ${ ({ color }) => isDarkColor(color) ? '#fff' : '#000' };
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    transition: all 0.4s ease-in-out;
    cursor: pointer;
  }
  &:hover svg {
    color: #fff;
    transform: scale(1.3);
  }
`
const ColorBoxContent = styled.div`
  z-index: 2;
  position: absolute;
  bottom: 0.2rem;
  width: 92%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
//#endregion

function NewPaletteForm({ opened, colors, palettes, setPalettes, history }) {
  const [paletteName, setPaletteName] = React.useState('')
  const [paletteEmoji, setPaletteEmoji] = React.useState('')

  const [emojiPickerOpened, setEmojiPickerOpened] = React.useState(false)
  const [emojiInvalid, setEmojiInvalid] = React.useState(false)

  //#region Form Handlers
  const addNewPalette = e => {
    setPalettes([...palettes, createNewPalette(paletteName, paletteEmoji, colors)])
    history.push('/palette-list')
  }
  const onError = errors => {
    errors = errors.map( error => ({ field: error.props.name, error: error.getErrorMessage() }) )
    console.log("TCL: NewPaletteForm -> onError", errors)
    setEmojiInvalid(errors.some( ({ field }) => field === 'paletteEmoji' ))
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
        disabled={colors.length < 5}
      >
        <SaveIcon className='mr-05' />
        Save All
      </Button>
      <Button
        variant='contained'
        className='flex-b-15 border-r-0'
        onClick={e => history.push('/palette-list')}
      >
        <Icon className='mr-05'>arrow_back</Icon>
        <span>Back</span>
      </Button>
    </ValidatorForm>
  )
}

function SidebarTitle({ colors, setColors }) {
  return (
    <ClearAllWrapper>
      <Button
        className='border-r-0'
        variant='contained'
        color='secondary'
        disabled={!colors.length}
        onClick={e => setColors([])}
      >
        <DeleteIcon className='mr-05' />
        Clear All Colors
      </Button>
    </ClearAllWrapper>
  )
}

function AddColorForm({ selectedColor, setSelectedColor, colors, setColors }) {
  const paletteFilled = colors.length === 20
  const [colorName, setColorName] = React.useState(selectedColor.name)

  //#region Form Handlers
  const onColorPicked = newColor => {
    let _colorName = getColorName(newColor.hex).replace(/#/,'h')
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
      <ChromePicker
        className='w-80'
        color={selectedColor.color}
        onChangeComplete={onColorPicked}
      />
      <Button
        className='w-80 border-r-0'
        variant='contained'
        color='default'
        size='large'
        disabled={paletteFilled}
        onClick={ _ => onColorPicked({ hex: getRandomColor() }) }
        >
          Random Color
      </Button>
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

const ColorBox = SortableElement(({ name, color, setColors }) => {
  const deleteColor = colorName => e => void setColors(colors => colors.filter(color => color.name !== colorName))
  return (
    <ColorBoxWrapper color={color}>
      <ColorBoxContent>
        <span>{name}</span>
        <DeleteIcon onClick={deleteColor(name)} />
      </ColorBoxContent>
    </ColorBoxWrapper>
  )
})

const SortableList = SortableContainer(({ colors, setColors }) => {
  return (
    <ColorBoxesWrapper>
      {colors.map((color, i) => (
        <ColorBox key={color.name} index={i} {...color} setColors={setColors} />
      ))}
    </ColorBoxesWrapper>
  )
})

function ColorBoxes({ colors, setColors }) {
  const reorderColors = ({ oldIndex, newIndex }) => void setColors(arrayMove(colors, oldIndex, newIndex))
  return <SortableList colors={colors} setColors={setColors} onSortEnd={reorderColors} axis='xy' />
}

function NewPalette({ palettes, setPalettes, history }) {
  const [colors, setColors] = React.useState(_initialPaletteColors)
  const [selectedColor, setSelectedColor] = React.useState(colors[0])
  return (
    <Sidebar
      sidebarButtonText='Add Colors'
      renderHeaderSection={(opened) => () => <NewPaletteForm opened={opened} colors={colors} palettes={palettes} setPalettes={setPalettes} history={history} />}
      renderSidebarTitle={() => <SidebarTitle colors={colors} setColors={setColors} />}
      renderSidebarSection={() => <AddColorForm colors={colors} setColors={setColors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />}
      renderMainSection={() => <ColorBoxes colors={colors} setColors={setColors} />}
    />
  )
}

export default NewPalette
