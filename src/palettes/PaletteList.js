import React from 'react'
import { Link } from 'react-router-dom'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

export default function PaletteList({ palettes }) {
  return (
    <div className='flex-column-center'>
      <h1>Palette List</h1>
      <List className='w-50'>
        {palettes.map(({ id, name, emoji = '🎨' }) => (
          <>
            <Link className='default-link' to={`/palette/${id}`}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar><span>{emoji}</span></Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
            <Divider />
          </>
        ))}
      </List>
    </div>
  )
}
