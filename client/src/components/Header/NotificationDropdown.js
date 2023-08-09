import React, { useContext } from 'react';
import { Menu, MenuItem, Avatar } from '@mui/material';
import { AppContext } from 'context/AppContext';
const NotificationDropdown = ({
  notificationAnchorEl,
  setNotificationAnchorEl,
  notifications,
}) => {
  const { setSelectedChat, setNotifications } = useContext(AppContext);
  const handleNotificationClick = (notification) => {
    setSelectedChat(notification.chat._id);
    setNotificationAnchorEl(null);
    setNotifications(
      ...notifications,
      notifications.filter((n) => n._id !== notification?._id)
    );
  };
  return (
    <Menu
      id="notification-menu"
      anchorEl={notificationAnchorEl}
      open={Boolean(notificationAnchorEl)}
      keepMounted
      onClose={() => {
        setNotificationAnchorEl(null);
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {!notifications?.length ? (
        <MenuItem className="header-menu-link header-menu-margin chat-icon">
          No new notifications
        </MenuItem>
      ) : (
        notifications?.map((notification) => (
          <MenuItem
            key={notification?._id}
            onClick={() => handleNotificationClick(notification)}
          >
            <Avatar
              alt={notification.sender.name[0]}
              src={notification.sender.profilePicture}
            />
            {`1 new notification from ${notification.sender.name}`}
          </MenuItem>
        ))
      )}
    </Menu>
  );
};

export default NotificationDropdown;
