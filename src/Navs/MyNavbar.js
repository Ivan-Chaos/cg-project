import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useState} from 'react';
import Drawer from '@mui/material/Drawer';

export default function MyNavbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (<div>
    <Drawer
      //anchor={'left'} 
      open={openDrawer}
    >
      <div style={{backgroundColor: 'black', height: '100%'}}>
        <div style={{color: 'white'}}>Навчальна програма</div>
      </div>
    </Drawer>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "black", textAlign: 'center' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography aligh="center" variant="h4" component="div" sx={{ flexGrow: 1 }}>
            F C M T
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>
  </div>
  );
}