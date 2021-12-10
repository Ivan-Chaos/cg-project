import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import '../Navs/NavSlider.css'
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import { useHistory } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

export default function MyNavbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const history = useHistory();
  const [highlightLetter, setHighlightLetter] = useState({ f: false, c: false, m: false, t: false });

  useEffect(() => {
    return history.listen((location) => {
      setHighlightLetter({
        f: window.location.href.includes('plasma') || window.location.href.includes('brownian'),
        c: window.location.href.includes('colors'),
        m: window.location.href.includes('colors'),
        t: window.location.href.includes('affine')
      })
    });
  }, [history])

  return (<div>
    <Drawer
      //anchor={'left'} 
      open={openDrawer}
    >
      <div className="drawer-global">
        <div className="drawer-header"><h4>Навчальна програма</h4></div>
        <hr style={{ color: 'white' }}></hr>
        <div className="drawer-item" onClick={() => {
          history.push("/");
          setOpenDrawer(false);
        }}>
          <HomeIcon className="drawer-icon" /> Головне меню
        </div>
        <div className="drawer-item" onClick={() => {
          history.push("/info");
          setOpenDrawer(false);
        }}>
          <InfoIcon className="drawer-icon" /> Інформація про програму
        </div>
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
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography aligh="center" variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title="Фрактали плазми та Броунівського руху" arrow>
                <div style={{ fontWeight: 600, padding: '0.125em', backgroundColor: highlightLetter.f ? 'yellow' : '', color: highlightLetter.f ? 'black' : '' }}>F</div>
              </Tooltip>

              <Tooltip title="Кольорні моделі CMYK та HSV" arrow>
                <div style={{ fontWeight: 600, padding: '0.125em', backgroundColor: highlightLetter.c ? '#9cd5d6' : '', color: highlightLetter.c ? 'black' : '' }}>C</div>
              </Tooltip>

              <Tooltip title="Кольорні моделі CMYK та HSV" arrow>
                <div style={{ fontWeight: 600, padding: '0.125em', backgroundColor: highlightLetter.c ? '#9cd5d6' : '', color: highlightLetter.c ? 'black' : '' }}>M</div>
              </Tooltip>

              <Tooltip title="Афінні перетворення" arrow>
                <div style={{ fontWeight: 600, padding: '0.125em', backgroundColor: highlightLetter.t ? '#90fa52' : '', color: highlightLetter.t ? 'black' : '' }}>T</div>
              </Tooltip>
            </div>
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>
  </div>
  );
}