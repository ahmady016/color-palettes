/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import styled from 'styled-components'

import Link from '@material-ui/core/Link'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import DeleteIcon from '@material-ui/icons/Delete'

//#region styled components
const PaletteListWrapper = styled.div`
  background-color: #0057e7;
  color: #fff;
  margin-top: -22px;
  padding-bottom: 2px;
`
const PaletteListTitle = styled.h1`
  padding: 0.5rem;
  box-shadow: 1px 1px 3px #222;
  & span {
    margin-right: 0.5rem;
  }
`
const NewPaletteLink = styled(Link)`
  color: #fff !important;
  font-size: 1rem;
`
const PaletteListItems = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`
const CardDiv = styled(Card)`
  position: relative;
  flex-basis: 30%;
  margin: 0.5rem;
  &:hover div {
    opacity: 1;
  }
`
const DeletePaletteDiv = styled.div`
  cursor: pointer;
  z-index: 99;
  position: absolute;
  top: 0;
  right: 0;
  width: 1.6rem;
  height: 1.6rem;
  padding: 0.3rem;
  background-color: #222;
  color: #fff;
  opacity: 0;
  transition: all 0.4s ease-in-out;
`
const ColorBoxesWrapper = styled(CardContent)`
  width: 90%;
  height: 10rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`
const ColorBoxWrapper = styled.div`
  background-color: ${({ color }) => color};
  width: 20%;
  height: 25%;
`
const PaletteName = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: #444;
`
//#endregion

const goToPalette = (id, history) => e => void history.push(`/palette/${id}`)

const ColorBox = ({ color }) => <ColorBoxWrapper color={color} />

function PaletteCard({ id, name, emoji, colors, history, setPalettes }) {
  const deletePalette = e => setPalettes(palettes => palettes.filter(palette => palette.id !== id))
  return (
    <CardDiv>
      <DeletePaletteDiv onClick={deletePalette}>
        <DeleteIcon />
      </DeletePaletteDiv>
      <CardActionArea onClick={goToPalette(id, history)}>
        <ColorBoxesWrapper>
          {colors.map(({name, color}) =>
            <ColorBox key={name} color={color} />
          )}
        </ColorBoxesWrapper>
        <Divider />
        <CardActions className='flex-between'>
          <PaletteName>{name}</PaletteName>
          <Avatar><span>{emoji}</span></Avatar>
        </CardActions>
      </CardActionArea>
    </CardDiv>
  )
}

function PaletteList({ palettes, setPalettes, history }) {
  return (
    <PaletteListWrapper>
      <PaletteListTitle className='flex-between'>
        <div className='flex-b-75'>
          <span>🎨</span>
          <span>Palette List</span>
        </div>
        <div className='flex-b-25'>
          <NewPaletteLink component='button' onClick={e => history.push('/palette/new')}>
            Create New Palette
          </NewPaletteLink>
        </div>
      </PaletteListTitle>
      <PaletteListItems>
        {palettes.map(palette =>
          <PaletteCard key={palette.id} history={history} {...palette} setPalettes={setPalettes} />
        )}
      </PaletteListItems>
    </PaletteListWrapper>
  )
}

export default PaletteList
