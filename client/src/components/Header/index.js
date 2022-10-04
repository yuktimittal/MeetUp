import React, { useState } from 'react';
import drinks from 'assets/images/drinks.svg';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './index.css';
import { Link } from 'react-router-dom';
import { Menu } from 'config/Routes/Menu.js';
import ProfileDropdown from './ProfileDropdown';

const drawerWidth = 240;

const Header = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { window } = props;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Mulakkat
      </Typography>
      <Divider />
      <List>
        {Menu.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link to={item.path}>
                <ListItemText primary={item.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ProfileDropdown
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
      />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <img style={{ width: '3rem' }} src={drinks} alt="app-logo" />

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              marginLeft: '1rem',
              display: { xs: 'block', sm: 'block' },
            }}
          >
            <Link className="app-logo-link" to="/">
              Mulakaat
            </Link>
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {Menu.map((item) => (
              <Link
                key={item.name}
                className="header-menu-link header-menu-margin"
                to={item.path}
              >
                {item.name}
              </Link>
            ))}

            <IconButton
              className="Profile"
              onClick={handleClick}
              sx={{ p: 0 }}
              aria-expanded={true}
            >
              <Avatar>Y</Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
