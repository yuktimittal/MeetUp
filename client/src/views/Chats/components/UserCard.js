import { Avatar, ListItem, ListItemIcon, ListItemText } from '@mui/material';
const UserCard = ({ onClick, name, profilePic }) => {
  return (
    <ListItem button onClick={onClick} key={name}>
      <ListItemIcon>
        <Avatar alt="Remy Sharp" src={profilePic} />
      </ListItemIcon>
      <ListItemText>{name}</ListItemText>
    </ListItem>
  );
};
export default UserCard;
