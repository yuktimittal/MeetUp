import React, { useState, useEffect, useContext } from 'react';
import ChatBox from './components/ChatBox';
import MessageContainer from './components/Message';
import {
  TextField,
  Grid,
  Paper,
  Divider,
  List,
  Fab,
  Button,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './index.css';
import { fetchChats } from 'services/ChatServices';
import { AppContext } from 'context/AppContext';
import SideDrawer from './components/SideDrawer';
import GroupChatModal from './components/GroupChatModal';

const Chat = () => {
  const { user } = useContext(AppContext);
  const [chatList, setChatList] = useState([]);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const [selectedChat, setSelectedChat] = useState();
  const [openCreateGroupChat, setOpenCreateGroupChat] = useState(false);

  useEffect(() => {
    fetchChats(setChatList);
  }, []);
  console.log(chatList);
  console.log('selected', selectedChat);

  const getSenderName = (chatId) => {
    let chat = chatList?.find((chat) => chat?._id === chatId);
    let sender = chat.users.find((c) => c._id !== user?.id);
    return sender;
  };

  return (
    <>
      <div className="chat-screen">
        <GroupChatModal
          openCreateGroupChat={openCreateGroupChat}
          setOpenCreateGroupChat={setOpenCreateGroupChat}
          setChatList={setChatList}
        />
        {user && (
          <SideDrawer
            openSearchDrawer={openSearchDrawer}
            setOpenSearchDrawer={setOpenSearchDrawer}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            chatList={chatList}
            setChatList={setChatList}
          />
        )}
        <Grid container component={Paper} className="chatSection">
          <Grid item xs={3} className="borderRight500">
            <Grid item xs={12} style={{ padding: '10px' }}>
              <TextField
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                color="primary"
                fullWidth
              />
            </Grid>

            <Button onClick={() => setOpenSearchDrawer(true)}>
              Create new chat
            </Button>
            <Button onClick={() => setOpenCreateGroupChat(true)}>
              Create group
            </Button>

            <Divider />
            <List className="chatlistArea">
              {chatList?.map((chat) => (
                <ChatBox
                  className="chat-box"
                  onClick={() => setSelectedChat(chat?._id)}
                  key={chat?._id}
                  username={
                    !chat?.isGroupChat
                      ? getSenderName(chat?._id)?.name
                      : chat?.name
                  }
                  online={false}
                  selected={selectedChat === chat?._id}
                  latestMessage={'Hello'}
                  profilePic={getSenderName(chat?._id)?.profilePicture}
                />
              ))}
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={8}>
            <List className="messageArea">
              <MessageContainer
                index={1}
                align={'right'}
                text="Hey man, What's up ?"
                time={'09:30'}
              />
              <MessageContainer
                index={2}
                align={'left'}
                text="Hey, I am Good! What about you ?"
                time={'09:31'}
              />
              <MessageContainer
                index={3}
                align={'right'}
                text="Cool. i am good, let's catch up!"
                time={'10:30'}
              />
              <MessageContainer
                index={1}
                align={'right'}
                text="Hey man, What's up ?"
                time={'09:30'}
              />
              <MessageContainer
                index={2}
                align={'left'}
                text="Hey, I am Good! What about you ?"
                time={'09:31'}
              />
              <MessageContainer
                index={3}
                align={'right'}
                text="Cool. i am good, let's catch up!"
                time={'10:30'}
              />
              <MessageContainer
                index={1}
                align={'right'}
                text="Hey man, What's up ?"
                time={'09:30'}
              />
              <MessageContainer
                index={2}
                align={'left'}
                text="Hey, I am Good! What about you ?"
                time={'09:31'}
              />
              <MessageContainer
                index={3}
                align={'right'}
                text="Cool. i am good, let's catch up!"
                time={'10:30'}
              />
            </List>
            <Grid container style={{ padding: '20px' }}>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Type a message"
                  fullWidth
                />
              </Grid>
              <Grid xs={1} align="right">
                <Fab color="primary" aria-label="add">
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Chat;
