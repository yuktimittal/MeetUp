import React, { useContext, useEffect, useState } from 'react';
import MessageContainer from './Message';
import { List, Fab, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { fetchMessagesOfAChat, sendMessage } from 'services/ChatServices';
import { AppContext } from 'context/AppContext';

const SingleChat = ({ selectedChat }) => {
  const { user } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (selectedChat) {
      fetchMessagesOfAChat(selectedChat, setMessages);
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    sendMessage(selectedChat, newMessage, setMessages);
  };

  const getTime = (createdAt) => {
    var time = new Date(createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return time;
  };
  return (
    selectedChat && (
      <div>
        <List className="messageArea">
          {messages &&
            messages.map((message) => (
              <MessageContainer
                key={message?._id}
                align={message?.sender?._id === user?.id ? 'right' : 'left'}
                text={message?.content}
                time={getTime(message.createdAt)}
              />
            ))}
        </List>
        <Grid container style={{ padding: '20px' }}>
          <Grid item xs={11}>
            <TextField
              label="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid xs={1} align="right">
            <Fab color="primary" aria-label="add">
              <SendIcon onClick={handleSendMessage} />
            </Fab>
          </Grid>
        </Grid>
      </div>
    )
  );
};
export default SingleChat;
