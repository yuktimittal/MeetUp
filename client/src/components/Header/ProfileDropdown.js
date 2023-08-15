import { Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { signOut } from 'login/services';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';

const ProfileDropdown = ({ open, handleClose, anchorEl }) => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {user ? (
        <div>
          <Typography flexGrow={1} color="#1F8A70" sx={{ textAlign: 'center' }}>
            {user?.name}
          </Typography>
          <hr />
          <MenuItem>View Profile</MenuItem>

          <MenuItem onClick={() => signOut(setUser, navigate)}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </div>
      ) : (
        <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
          <MenuItem>Log In</MenuItem>
        </Link>
      )}
    </Menu>
  );
};

export default ProfileDropdown;
