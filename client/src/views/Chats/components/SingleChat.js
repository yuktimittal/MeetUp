import React, { useContext, useEffect, useRef, useState } from 'react';
import MessageContainer from './Message';
import { List, Fab, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { fetchMessagesOfAChat, sendMessage } from 'services/ChatServices';
import { AppContext } from 'context/AppContext';
import io from 'socket.io-client';
import Lottie from 'react-lottie';
import animationData from '../../../assets/animations/typing.json';

const ENDPOINT = 'http://localhost:4000';
var socket, selectedChatCompare;

const SingleChat = ({ selectedChat }) => {
  const { user } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserverAspectRatio: 'xMidYMid slice',
    },
  };

  console.log('connected', socketConnected);

  useEffect(() => {
    socket = io(ENDPOINT);
    if (user) {
      socket.emit('setup', user);
      socket.on('connected', () => setSocketConnected(true));
      socket.on('typing', () => setIsTyping(true));
      socket.on('stop typing', () => setIsTyping(false));
    }
  }, [user]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    if (selectedChat) {
      fetchMessagesOfAChat(selectedChat, setMessages, socket);

      selectedChatCompare = selectedChat;
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare !== newMessageReceived.chat._id
      ) {
        //give notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const handleSendMessage = () => {
    sendMessage(selectedChat, newMessage, setMessages, setNewMessage, socket);
    socket.emit('stop typing', selectedChat);
    setTyping(false);
  };

  const getTime = (createdAt) => {
    var time = new Date(createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return time;
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChat);
        setTyping(false);
      }
    }, timerLength);
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
          <div ref={messagesEndRef} />
        </List>
        <Grid container style={{ padding: '20px' }}>
          <Grid item xs={11}>
            {isTyping ? (
              <div>
                <Lottie
                  options={defaultOptions}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              </div>
            ) : (
              <></>
            )}
            <TextField
              label="Type a message"
              value={newMessage}
              onChange={typingHandler}
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