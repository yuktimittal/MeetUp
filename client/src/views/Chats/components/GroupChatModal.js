import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Chip,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTheme } from '@mui/material/styles';
import { fetchUsers } from 'services/UserServices';
import { CreateGroup } from 'services/ChatServices';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid grey',
  borderRadius: '0.4rem',
  boxShadow: 24,
  p: 4,
};
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

//

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const GroupChatModal = ({
  openCreateGroupChat,
  setOpenCreateGroupChat,
  setChatList,
}) => {
  const [users, setUsers] = useState();
  const theme = useTheme();
  const [groupName, setGroupName] = useState('');
  const [personName, setPersonName] = useState([]);
  const handleClose = () => {
    setOpenCreateGroupChat(false);
    setGroupName('');
    setPersonName([]);
  };

  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleCreateGroup = () => {
    CreateGroup(
      groupName,
      setGroupName,
      personName,
      setPersonName,
      setChatList,
      setOpenCreateGroupChat
    );
  };

  return (
    <div>
      <Modal open={openCreateGroupChat} onClose={handleClose}>
        <Box sx={style}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              flexGrow={1}
              className="create-group-title"
              variant="h6"
              color="#1F8A70"
            >
              Create Group Chat
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <div>
            <TextField
              label={'Group Name'}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              sx={{ mt: 2, width: '100%' }}
            />
            <FormControl sx={{ mt: 2, width: '100%' }}>
              <InputLabel>Select Users</InputLabel>
              <Select
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={users?.find((user) => user?._id === value)?.name}
                        onDelete={() =>
                          setPersonName(
                            personName.filter((item) => item !== value)
                          )
                        }
                        deleteIcon={
                          <CancelIcon
                            onMouseDown={(event) => event.stopPropagation()}
                          />
                        }
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {users?.map((user) => (
                  <MenuItem
                    key={user?._id}
                    value={user?._id}
                    style={getStyles(user?.name, personName, theme)}
                  >
                    {user?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleCreateGroup}
              variant="contained"
              sx={{ mt: 1, float: 'right' }}
            >
              Create Group
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default GroupChatModal;
