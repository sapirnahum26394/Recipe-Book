import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function MyToolBar() {
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="fixed" color="primary">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Button href='/newrecipe' color="inherit" aria-label="new">
                    New Recipe
                </Button>
            </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
  }
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1f1f1f',
      },
    },
  });
  
  export default MyToolBar;
  