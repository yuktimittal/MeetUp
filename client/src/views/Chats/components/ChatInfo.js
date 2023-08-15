import React, { useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  Avatar,
  Toolbar,
  Chip,
  IconButton,
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { renameGroup } from 'services/ChatServices';

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
  setChatList,
}) => {
  const [isGroupNameEditable, setGroupNameEditable] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const handleClose = () => setOpenChatInfo(false);
  const isGroupAdmin = (userId) => {
    if (chat?.groupAdmin?._id === userId) return true;
    return false;
  };
  const handleEditing = () => {
    setGroupNameEditable(true);
  };
  const handlGroupNameChange = (e) => {
    setNewGroupName(e.target.innerText);
  };
  const handleNameSubmit = () => {
    renameGroup(chat?._id, newGroupName, setGroupNameEditable, setChatList);
  };

  return (
    <Modal open={openChatInfo} onClose={handleClose}>
      <Box sx={style}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            contentEditable={isGroupNameEditable}
            suppressContentEditableWarning={true}
            onInput={handlGroupNameChange}
            onBlur={handleNameSubmit}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleNameSubmit(event);
              }
            }}
            flexGrow={1}
            variant="h6"
            color="#1F8A70"
            textAlign={'center'}
          >
            {chatName}
            {chat?.isGroupChat && !isGroupNameEditable && (
              <IconButton onClick={handleEditing}>
                <ModeEditIcon />
              </IconButton>
            )}
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
                    key={user?._id}
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
