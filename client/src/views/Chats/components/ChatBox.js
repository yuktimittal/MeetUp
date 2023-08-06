import React from 'react';
import { ListItem, Avatar, ListItemIcon, ListItemText } from '@mui/material';
const ChatBox = ({
  onClick,
  username,
  online = false,
  selected = false, // Boolean to indicate if chat is selected or not
  latestMessage,
  profilePic,
}) => {
  console.log('sel', selected);
  return (
    <ListItem
      onClick={onClick}
      button
      key={username}
      className={selected && 'selected-chat-box-item'}
    >
      <ListItemIcon>
        <Avatar alt="Remy Sharp" src={profilePic} />
      </ListItemIcon>
      <ListItemText>{username}</ListItemText>
      <ListItemText
        secondary={online ? 'online' : null}
        align="right"
      ></ListItemText>
      <ListItemText align="bottom">{latestMessage}</ListItemText>
    </ListItem>
  );
};
export default ChatBox;
