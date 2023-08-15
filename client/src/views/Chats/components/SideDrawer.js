import { Grid, TextField, SwipeableDrawer, Typography } from '@mui/material';
import { useState } from 'react';
import { fetchUsers } from 'services/UserServices';
import UserCard from './UserCard';
import { CreateOrAccessChat } from 'services/ChatServices';
const SideDrawer = ({
  openSearchDrawer,
  setOpenSearchDrawer,
  setSelectedChat,
  chatList,
  setChatList,
}) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchUsers(setUsers, e.target.value);
  };
  const handleCreateChat = (userId) => {
    CreateOrAccessChat(userId, setSelectedChat, chatList, setChatList);
    setOpenSearchDrawer(false);
    setSearch('');
    setUsers([]);
  };
  return (
    <SwipeableDrawer
      anchor={'left'}
      open={openSearchDrawer}
      onClose={() => setOpenSearchDrawer(false)}
      onOpen={() => setOpenSearchDrawer(true)}
    >
      <Typography variant="h6" gutterBottom className="side-drawer-heading">
        Create New Chat
      </Typography>
      <Grid item xs={12} className="sidedrawer-search-bar">
        <TextField
          id="outlined-basic-email"
          label="Search"
          variant="outlined"
          color="primary"
          fullWidth
          value={search}
          onChange={handleSearch}
        />
      </Grid>
      {users &&
        users.map((user) => (
          <UserCard
            onClick={() => handleCreateChat(user?._id)}
            key={user.email}
            profilePic={user?.profilePicture}
            name={user?.name}
          />
        ))}
    </SwipeableDrawer>
  );
};
export default SideDrawer;
