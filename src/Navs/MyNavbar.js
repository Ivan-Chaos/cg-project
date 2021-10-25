import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function MyNavbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: "black", textAlign: 'center'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography aligh="center" variant="h4" component="div" sx={{ flexGrow: 1 }}>
            F C M T
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>
  );
}