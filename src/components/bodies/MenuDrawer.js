import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import {Grid, Box, Toolbar, IconButton, Divider, Typography, CssBaseline} from '@mui/material';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';


import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {RiAdminFill} from 'react-icons/ri'
import {FaUser} from 'react-icons/fa'
import { BsFilePostFill} from 'react-icons/bs'

import AdminManagement from './AdminManagement';
import UserManagement from './UserManagement';
import PostManagement from './PostManagement';

//Styling the drawer
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

//Styling App Bar
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  

const MenuDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(1);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //Menu item
    const menuItems = [
        {
            id: 1,
            item: 'Post Management'
        },
        {
            id: 2,
            item: 'Admin Management'
        },
        {
            id: 3,
            item: 'User Management'
        }, 
    ]

    const iconChanger = (iconName) => {
        if (iconName === 'Post Management'){
            return( <BsFilePostFill style={{fontSize:23, color: selectedItem === 1 ? 'white': '#A7C4BC'}} />);
        } else if (iconName === 'Admin Management'){
            return( <RiAdminFill style={{fontSize:23, color: selectedItem === 2 ? 'white': '#A7C4BC'}} />);
        } else {
            return( <FaUser style={{fontSize:23, color: selectedItem === 3 ? 'white': '#A7C4BC'}} />);
        }
    }

    const renderMenuItem = menuItems.map(({id, item})=>{
        return(
            <ListItem key={id} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                    onClick= {()=> {setSelectedItem(id)}}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                     {iconChanger(item)}
                    </ListItemIcon>
                <ListItemText 
                    primary={
                        <Typography 
                            variant='caption' 
                            sx={{
                                fontFamily:'raleway', 
                                fontSize:15,
                                fontWeight:'bold', 
                                color: selectedItem === id ? 'white': '#A7C4BC'}}
                        >
                            {item}
                        </Typography>
                    } 
                    sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        );
    })
    
  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />

      {/* App bar: the bar that holds the menu icon and the logo */}
      <AppBar position="fixed" open={open} sx={{backgroundColor: '#5E8B7E'}}> 
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{fontFamily:'Arvo'}} noWrap component="div">
            React Django Example
          </Typography>
        </Toolbar>
      </AppBar> {/* End of App Bar */}
      
      {/* Side Drawer: the side bar that holds the menu items */}
      <Drawer 
        variant="permanent" 
        open={open} 
        PaperProps={{sx: {backgroundColor: '#5E8B7E'}}}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {renderMenuItem}
        </List>
        
      </Drawer>

      {/* Body Holder - must depend on the value of the menu */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt:0 }}>
        <DrawerHeader />

        {/* Container taht holds the content of per menu */}
        <Grid container direction='column' alignItems='center' sx={{ width:'100%', height:'500', p:5, pt:3}}>

            {/* From here, Grid item will be displayed base on the value of selectedItem */}
            <Grid item sx={{p:5, width:'100%', height:300, display: selectedItem === 1 ? 'flex': 'none'}} >
                <PostManagement />
            </Grid>

            <Grid item sx={{p:5, width:'100%', height:300, display: selectedItem === 2 ? 'flex': 'none'}} >
                <AdminManagement />
            </Grid>

            <Grid item sx={{p:5, width:'100%', height:300, display: selectedItem === 3 ? 'flex': 'none'}} >
                <UserManagement />
            </Grid>
        </Grid>
        
      </Box>
    </Box>
  );
}


export default MenuDrawer