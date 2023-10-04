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
  return (
    <ListItem
      onClick={onClick}
      button
      key={username}
      className={selected ? 'selected-chat-box-item' : null}
    >
      <ListItemIcon>
        <Avatar alt={username?.[0]} src={profilePic} />
      </ListItemIcon>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ListItemText>{username}</ListItemText>
        <ListItemText
          secondary={online ? 'online' : null}
          align="right"
        ></ListItemText>
        {latestMessage && (
          <ListItemText align="bottom" className="latest-message">
            {`${latestMessage?.sender?.name}: ${latestMessage?.content}`}
          </ListItemText>
        )}
      </div>
    </ListItem>
  );
};
export default ChatBox;
