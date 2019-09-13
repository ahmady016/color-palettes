/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { Link } from 'react-router-dom'
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

const ColorBox = ({ color }) => <ColorBoxWrapper color={color} />

export default function PaletteList({ palettes }) {
  return (
    <PaletteListWrapper>
      <PaletteListTitle>
        <span>🎨</span>
        <span>Palette List</span>
      </PaletteListTitle>
      <div className='flex-center flex-wrap w-90 m-auto'>
          {palettes.map(({ id, name, emoji, colors }) => (
            <Card key={id} className='flex-b-30 m-05'>
              <Link className='default-link' to={`/palette/${id}`}>
                <CardActionArea>
                  <ColorBoxesWrapper>
                    {colors.map(({name, color}) => <ColorBox key={name} color={color} />)}
                  </ColorBoxesWrapper>
                  <Divider />
                  <CardActions className='flex-between'>
                    <PaletteName>{name}</PaletteName>
                    <Avatar><span>{emoji}</span></Avatar>
                  </CardActions>
                </CardActionArea>
              </Link>
            </Card>
          ))}
      </div>
    </PaletteListWrapper>
  )
}
