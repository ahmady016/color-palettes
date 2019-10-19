import React from 'react'

import { ChromePicker } from 'react-color'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { isDarkColor, getColorName, getRandomColor } from '../helpers/colorLevels'
import Sidebar from '../Sidebar'

// #region app const and variables
const _initialColors = [
  { name: getColorName('#00ff00'), value: '#00ff00' },
  { name: getColorName('#ff0000'), value: '#ff0000' },
  { name: getColorName('#0000ff'), value: '#0000ff' }
]
// #endregion

//#region styled components
const AddColorButton = styled(Button)`
  width: 100%;
  border-radius: 0 !important;
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

function NewPaletteForm() {
  return (
    <p className='flex-b-75'>New Palette Form</p>
  )
}

function AddColorForm({ selectedColor, setSelectedColor, colors, setColors }) {
  const [colorName, setColorName] = React.useState(selectedColor.name)
  const paletteFilled = colors.length === 20
  const addNewColor = _ =>
    !paletteFilled
      ? setColors( prevColors => [...prevColors, { name: colorName, value: selectedColor.value }] )
      : null
  const onColorPicked = newColor => {
    let _colorName = getColorName(newColor.hex)
    setColorName(_colorName)
    setSelectedColor({ name: _colorName, value: newColor.hex })
  }

  React.useEffect(
    () => {
      ValidatorForm.addValidationRule(
        'isNewName',
        value => colors.every( ({ name }) => name.toLowerCase() !== value.toLowerCase())
      )
      ValidatorForm.addValidationRule(
        'isNewValue',
        value => colors.every( (color) => color.value !== value)
      )
    },
    [colors]
  )

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
        color={selectedColor.value}
        onChangeComplete={onColorPicked}
      />
      <ValidatorForm
        className='w-80'
        onSubmit={addNewColor}
        onError={console.log}
      >
        <TextValidator
          className='w-50'
          label='Color Value'
          name='colorValue'
          value={selectedColor.value}
          validators={['required','isNewValue']}
          errorMessages={['Enter a Color Name', 'Color already used']}
          readOnly
        />
        <TextValidator
          className='w-50'
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
          bgColor={selectedColor.value}
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
      {colors.map(({name, value}) => (
        <ColorBoxWrapper key={name} color={value}>
          <span>{name}</span>
        </ColorBoxWrapper>
      ))}
    </ColorBoxesWrapper>
  )
}

function NewPalette() {
  const [colors, setColors] = React.useState(_initialColors)
  const [selectedColor, setSelectedColor] = React.useState(colors[0])
  return (
    <Sidebar
      sidebarTitle='Design Your Palette'
      sidebarButtonText='Add Colors'
      renderHeaderSection={() => <NewPaletteForm />}
      renderSidebarSection={() => <AddColorForm colors={colors} setColors={setColors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />}
      renderMainSection={() => <ColorBoxes colors={colors} />}
    />
  )
}

export default NewPalette
