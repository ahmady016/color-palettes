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

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'

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
const ColoredAvatar = styled(Avatar)`
  background-color: ${ ({ color }) => color[100] } !important;
  color: ${ ({ color }) => color[600] } !important;
`
//#endregion

const goToPalette = (id, history) => e => void history.push(`/palette/${id}`)

const ColorBox = ({ color }) => <ColorBoxWrapper color={color} />

function ConfirmDeleteDialog({ opened, setOpened, setPalettes, paletteIdToDelete }) {
  const deletePalette = e => {
    setPalettes(palettes => palettes.filter(palette => palette.id !== paletteIdToDelete))
    setOpened(false)
  }
  return (
    <Dialog open={opened} onClose={() => setOpened(false)} aria-labelledby="simple-dialog-title">
      <DialogTitle>Are you sure deleting this Palette ?</DialogTitle>
      <List>
        <ListItem button onClick={deletePalette}>
          <ListItemAvatar>
            <ColoredAvatar color={blue}>
              <CheckIcon />
            </ColoredAvatar>
          </ListItemAvatar>
          <ListItemText primary="Delete" />
        </ListItem>
        <ListItem autoFocus button onClick={e => setOpened(false)}>
          <ListItemAvatar>
            <ColoredAvatar color={red}>
              <CloseIcon />
            </ColoredAvatar>
          </ListItemAvatar>
          <ListItemText primary="Cancel" />
        </ListItem>
      </List>
    </Dialog>
  )
}

function PaletteCard({ id, name, emoji, colors, history, setOpened, setPaletteIdToDelete }) {
  const toDelete = id => e => {
    setOpened(true)
    setPaletteIdToDelete(id)
  }
  return (
    <CardDiv>
      <DeletePaletteDiv onClick={toDelete(id)}>
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
  const [opened, setOpened] = React.useState(false)
  const [paletteIdToDelete, setPaletteIdToDelete] = React.useState(true)
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
          <PaletteCard key={palette.id} history={history} {...palette} setOpened={setOpened} setPaletteIdToDelete={setPaletteIdToDelete} />
        )}
      </PaletteListItems>
      <ConfirmDeleteDialog opened={opened} setOpened={setOpened} setPalettes={setPalettes} paletteIdToDelete={paletteIdToDelete} />
    </PaletteListWrapper>
  )
}

export default PaletteList
