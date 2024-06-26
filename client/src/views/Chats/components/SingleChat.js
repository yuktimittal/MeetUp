import React, { useContext, useEffect, useRef, useState } from 'react';
import MessageContainer from './Message';
import {
  List,
  Fab,
  Grid,
  TextField,
  IconButton,
  Box,
  Avatar,
  Typography,
  Toolbar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {
  fetchChats,
  fetchMessagesOfAChat,
  sendMessage,
} from 'services/ChatServices';
import { AppContext } from 'context/AppContext';
import io from 'socket.io-client';
import Lottie from 'react-lottie';
import animationData from '../../../assets/animations/typing.json';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChatInfo from './ChatInfo';

const ENDPOINT = 'http://localhost:4000';
var socket, selectedChatCompare;

const SingleChat = ({
  selectedChat,
  chat,
  chatName,
  profilePicture,
  senderId,
  setChatList,
}) => {
  const { user, notifications, setNotifications } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [openChatInfo, setOpenChatInfo] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserverAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    if (user) {
      socket.emit('setup', user);
      socket.on('connected', () => setSocketConnected(true));
      socket.on('typing', (userId) => {
        if (user?.id !== userId) {
          setIsTyping(true)
        }
      });
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
        if (!notifications.includes(newMessageReceived)) {
          setNotifications([newMessageReceived, ...notifications]);
        }
        fetchChats(setChatList);
      } else {
        setMessages([...messages, newMessageReceived]);
        fetchChats(setChatList);
      }
    });
  });

  const handleSendMessage = () => {
    sendMessage(
      selectedChat,
      newMessage,
      setMessages,
      setNewMessage,
      setChatList,
      socket
    );
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
      socket.emit('typing', { room: selectedChat, userId: user?.id });
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  return (
    selectedChat && (
      <div>
        <ChatInfo
          chat={chat}
          chatName={chatName}
          profilePicture={profilePicture}
          senderId={senderId}
          openChatInfo={openChatInfo}
          setOpenChatInfo={setOpenChatInfo}
          setChatList={setChatList}
        />
        <Box
          style={{
            backgroundColor: '#66B2B2',
            padding: '0.2rem 0.5rem',
          }}
        >
          <Toolbar
            className="chat-header-toolbar"
            sx={{ justifyContent: 'space-between' }}
          >
            <div
              style={{
                display: 'flex',
              }}
            >
              <Avatar style={{ margin: '1rem' }}>
                {chat?.isGroupChat ? chatName?.[0] : profilePicture}
              </Avatar>
              <Typography style={{ marginTop: '1.5rem' }}>
                {chatName}
              </Typography>
            </div>
            <IconButton
              sx={{ marginLeft: 'auto' }}
              onClick={() => setOpenChatInfo(true)}
            >
              <VisibilityIcon />
            </IconButton>
          </Toolbar>
        </Box>
        <List className="messageArea">
          {messages &&
            messages.map((message) => (
              <MessageContainer
                key={message?._id}
                align={message?.sender?._id === user?.id ? 'right' : 'left'}
                text={message?.content}
                profilePicture={message?.sender?.profilePicture}
                time={getTime(message.createdAt)}
              />
            ))}
          <div ref={messagesEndRef} />
        </List>
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
        <Grid container style={{ padding: '20px' }}>
          <Grid item xs={11}>
            <TextField
              label="Type a message"
              value={newMessage}
              onKeyDown={handleKeyDown}
              onChange={typingHandler}
              fullWidth
            />
          </Grid>
          <Grid item xs={1} align="right">
            <Fab color="primary" aria-label="add" onClick={handleSendMessage}>
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      </div>
    )
  );
};
export default SingleChat;
