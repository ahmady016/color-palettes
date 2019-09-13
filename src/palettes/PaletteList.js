/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import styled from 'styled-components'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'

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
const PaletteListItems = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
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

function PaletteCard({ id, name, emoji, colors, history }) {
  return (
    <Card className='flex-b-30 m-05'>
      <CardActionArea onClick={goToPalette(id, history)}>
        <ColorBoxesWrapper>
          {colors.map(({name, color}) => <ColorBox key={name} color={color} />)}
        </ColorBoxesWrapper>
        <Divider />
        <CardActions className='flex-between'>
          <PaletteName>{name}</PaletteName>
          <Avatar><span>{emoji}</span></Avatar>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}

export default function PaletteList({ palettes, history }) {
  return (
    <PaletteListWrapper>
      <PaletteListTitle>
        <span>🎨</span>
        <span>Palette List</span>
      </PaletteListTitle>
      <PaletteListItems>
        {palettes.map(palette => <PaletteCard key={palette.id} history={history} {...palette} />)}
      </PaletteListItems>
    </PaletteListWrapper>
  )
}
