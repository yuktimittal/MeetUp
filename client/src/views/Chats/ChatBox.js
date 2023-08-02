import React from 'react';
import { ListItem, Avatar, ListItemIcon, ListItemText } from '@mui/material';
const ChatBox = ({ username, online = false, profilePic }) => {
  return (
    <ListItem button key={username}>
      <ListItemIcon>
        <Avatar alt="Remy Sharp" src={profilePic} />
      </ListItemIcon>
      <ListItemText>{username}</ListItemText>
      <ListItemText
        secondary={online ? 'online' : null}
        align="right"
      ></ListItemText>
    </ListItem>
  );
};
export default ChatBox;
