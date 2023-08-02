import React, { useState, useEffect } from 'react';
import ChatBox from './ChatBox';
import MessageContainer from './Message';
import { TextField, Grid, Paper, Divider, List, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './index.css';
import { fetchChats } from 'services/ChatServices';

const Chat = () => {
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
    fetchChats(setChatList);
  }, []);
  console.log(chatList);
  return (
    <div className="chat-screen">
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
          <Divider />
          <List className="chatlistArea">
            <ChatBox
              username={'Remy Sharp'}
              online={true}
              profilePic={'https://material-ui.com/static/images/avatar/1.jpg'}
            />
            <ChatBox
              username={'Cindy Baker'}
              online={false}
              profilePic={'https://material-ui.com/static/images/avatar/2.jpg'}
            />
            <ChatBox
              username={'Alice'}
              online={false}
              profilePic={'https://material-ui.com/static/images/avatar/3.jpg'}
            />
            <ChatBox
              username={'Remy Sharp'}
              online={true}
              profilePic={'https://material-ui.com/static/images/avatar/1.jpg'}
            />
            <ChatBox
              username={'Cindy Baker'}
              online={false}
              profilePic={'https://material-ui.com/static/images/avatar/2.jpg'}
            />
            <ChatBox
              username={'Alice'}
              online={false}
              profilePic={'https://material-ui.com/static/images/avatar/3.jpg'}
            />
            <ChatBox
              username={'Remy Sharp'}
              online={true}
              profilePic={'https://material-ui.com/static/images/avatar/1.jpg'}
            />
            <ChatBox
              username={'Cindy Baker'}
              online={false}
              profilePic={'https://material-ui.com/static/images/avatar/2.jpg'}
            />
            <ChatBox
              username={'Alice'}
              online={false}
              profilePic={'https://material-ui.com/static/images/avatar/3.jpg'}
            />
            <ChatBox
              username={'Remy Sharp'}
              online={true}
              profilePic={'https://material-ui.com/static/images/avatar/1.jpg'}
            />
            <ChatBox
              username={'Cindy Baker'}
              online={false}
              profilePic={'https://material-ui.com/static/images/avatar/2.jpg'}
            />
            <ChatBox
              username={'Alice'}
              online={false}
              profilePic={'https://material-ui.com/static/images/avatar/3.jpg'}
            />
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
  );
};

export default Chat;
