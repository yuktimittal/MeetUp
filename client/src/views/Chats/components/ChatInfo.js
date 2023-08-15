import React from 'react';
import { Box, Typography, Modal, Avatar, Toolbar, Chip } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '1px solid grey',
  borderRadius: '0.4rem',
  boxShadow: 24,
  p: 4,
};
const ChatInfo = ({
  chat,
  chatName,
  profilePicture,
  openChatInfo,
  setOpenChatInfo,
}) => {
  console.log('chat', chat);
  const handleClose = () => setOpenChatInfo(false);
  const isGroupAdmin = (userId) => {
    if (chat?.groupAdmin?._id === userId) return true;
    return false;
  };
  return (
    <Modal open={openChatInfo} onClose={handleClose}>
      <Box sx={style}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            flexGrow={1}
            className="create-group-title"
            variant="h6"
            color="#1F8A70"
            textAlign={'center'}
          >
            {chatName}
          </Typography>
        </div>

        <Box className={!chat?.isGroupChat ? 'test-avatar' : null}>
          {chat?.isGroupChat ? (
            <>
              <div
                style={{ textAlign: 'center' }}
              >{`Group. ${chat?.users?.length} members`}</div>
              <div>
                {chat?.users?.map((user) => (
                  <Toolbar
                    style={{ paddingLeft: 0, justifyContent: 'space-between' }}
                  >
                    <Toolbar style={{ paddingLeft: 0 }}>
                      <Avatar src={user.profilePicture} alt=""></Avatar>
                      <span style={{ marginLeft: '1rem' }}>{user.name}</span>
                    </Toolbar>
                    {isGroupAdmin(user?._id) && (
                      <Toolbar className="chat-info-admin-toolbar">
                        <Chip
                          label="admin"
                          color="primary"
                          variant="outlined"
                        />
                      </Toolbar>
                    )}
                  </Toolbar>
                ))}
              </div>
            </>
          ) : (
            <Avatar
              sx={{
                width: 100,
                height: 100,
              }}
              src={profilePicture}
              alt=""
            ></Avatar>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ChatInfo;
