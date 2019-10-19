import React from 'react'

import styled from 'styled-components'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MenuIcon from '@material-ui/icons/Menu'

//#region material-ui styles
const drawerWidth = 30
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}%)`,
    marginLeft: `${drawerWidth}%`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: `${drawerWidth}%`,
    flexShrink: 0,
  },
  drawerPaper: {
    width: `${drawerWidth}%`,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}%`,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
//#endregion

//#region styled components
const OpenButton = styled(Button)`
  flex-basis: 20%;
  border-radius: 0 !important;
`
const HeaderToolbar = styled(Toolbar)`
  justify-content: space-between;
  padding: 0 !important;
`
//#endregion

function Sidebar({ renderHeaderSection, renderSidebarSection, renderMainSection, sidebarTitle, sidebarButtonText }) {
  const classes = useStyles()
  const [opened, setOpened] = React.useState(true)

  return (
    <div className={classes.root}>
      {/* AppBar (header) */}
      <AppBar
        color='default'
        position='fixed'
        className={clsx(classes.appBar, opened && classes.appBarShift)}
      >
        <HeaderToolbar>
          <OpenButton size='large'
            variant='contained'
            color='default'
            onClick={e => setOpened(true)}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              className={clsx(classes.menuButton, opened && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            {sidebarButtonText}
          </OpenButton>
          {/* header content placeholder */}
          {renderHeaderSection()}
        </HeaderToolbar>
      </AppBar>
      {/* Drawer (sidebar) */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={opened}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant='h6'>{sidebarTitle}</Typography>
          <IconButton onClick={e => setOpened(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {/* sidebar content placeholder */}
        {renderSidebarSection()}
      </Drawer>
      {/* Main */}
      <main className={clsx(classes.content, opened && classes.contentShift)}>
        <div className={classes.drawerHeader} />
        {/* main content placeholder */}
        {renderMainSection()}
      </main>
    </div>
  )
}

export default Sidebar
