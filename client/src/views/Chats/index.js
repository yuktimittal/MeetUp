import React, { useState, useEffect, useContext } from 'react';
import ChatBox from './components/ChatBox';
import { TextField, Grid, Paper, Divider, List, Button } from '@mui/material';

import './index.css';
import { fetchChats } from 'services/ChatServices';
import { AppContext } from 'context/AppContext';
import SideDrawer from './components/SideDrawer';
import GroupChatModal from './components/GroupChatModal';
import SingleChat from './components/SingleChat';

const Chat = () => {
  const { user } = useContext(AppContext);
  const [chatList, setChatList] = useState([]);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const [selectedChat, setSelectedChat] = useState('');
  const [openCreateGroupChat, setOpenCreateGroupChat] = useState(false);

  useEffect(() => {
    fetchChats(setChatList);
  }, []);

  const handleSelectedChat = (chatId) => {
    setSelectedChat(chatId);
  };

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
                  onClick={() => handleSelectedChat(chat?._id)}
                  key={chat?._id}
                  username={
                    !chat?.isGroupChat
                      ? getSenderName(chat?._id)?.name
                      : chat?.name
                  }
                  online={false}
                  selected={selectedChat === chat?._id}
                  latestMessage={chat?.latestMessage?.content}
                  profilePic={getSenderName(chat?._id)?.profilePicture}
                />
              ))}
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={8}>
            <SingleChat selectedChat={selectedChat} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Chat;
