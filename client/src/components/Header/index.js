import React, { useContext, useState } from 'react';
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
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './index.css';
import { Link } from 'react-router-dom';
import { Menu as RouteMenu } from 'config/Routes/Menu.js';
import ProfileDropdown from './ProfileDropdown';
import { AppContext } from 'context/AppContext';
import NotificationDropdown from './NotificationDropdown';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';

const drawerWidth = 240;

const Header = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { window } = props;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { user, notifications } = useContext(AppContext);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Mulakkat
      </Typography>
      <Divider />
      <List>
        {RouteMenu.map((item) => (
          <ListItem key={item.name} disablePadding>
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
  const [notificationAnchorEl, setNotificationAnchorEl] = useState();
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

          {user && user?.email ? (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {RouteMenu.map((item) => (
                <Link
                  key={item.name}
                  className="header-menu-link header-menu-margin"
                  to={item.path}
                >
                  {item.name}
                </Link>
              ))}
              <Link to={'/chats'}>
                <ChatOutlinedIcon className="header-menu-link header-menu-margin chat-icon"></ChatOutlinedIcon>
              </Link>
              <IconButton
                aria-controls="notification-menu"
                aria-haspopup="true"
                aria-expanded={true}
                onClick={(event) => {
                  setNotificationAnchorEl(event.currentTarget);
                }}
              >
                <NotificationsIcon className="header-menu-link header-menu-margin chat-icon" />
                <NotificationBadge
                  count={notifications?.length}
                  effect={Effect.SCALE}
                />
              </IconButton>
              <NotificationDropdown
                notificationAnchorEl={notificationAnchorEl}
                setNotificationAnchorEl={setNotificationAnchorEl}
                notifications={notifications}
              />

              <IconButton
                className="Profile"
                onClick={handleClick}
                sx={{ p: 0 }}
                aria-expanded={true}
              >
                {user?.profilePicture ? (
                  <Avatar src={user?.profilePicture}></Avatar>
                ) : (
                  <Avatar>{user?.email?.[0]}</Avatar>
                )}
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link
                className="header-menu-link header-menu-margin"
                to={'/login'}
              >
                Login
              </Link>
            </Box>
          )}
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
