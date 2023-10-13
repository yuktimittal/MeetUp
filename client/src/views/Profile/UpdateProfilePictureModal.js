import { Box, Modal, Button, Avatar } from '@mui/material';
import { updateUser } from 'services/UserServices';

const UpdateProfilePictureModal = ({
  id,
  openUpdateProfileModal,
  setOpenUpdateProfileModal,
  profilePic,
  setProfilePic,
  setProfileUser,
}) => {
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

  const handleCloseProfilePictureModal = () => {
    setOpenUpdateProfileModal(false);
    setProfilePic(null);
  };
  const handleUpdateProfilePicture = () => {
    let userDetails = { profilePicture: profilePic };
    updateUser(id, userDetails, setProfileUser);
    handleCloseProfilePictureModal();
  };

  return (
    <Modal
      open={openUpdateProfileModal}
      onClose={handleCloseProfilePictureModal}
    >
      <Box sx={style}>
        <Avatar
          sx={{
            width: 150,
            height: 150,
            border: '1px solid black',
            margin: 'auto',
          }}
          src={profilePic}
        ></Avatar>
        <Button
          onClick={handleUpdateProfilePicture}
          variant="contained"
          sx={{
            mt: 2,
            width: '100%',
          }}
        >
          Update Profile Picture
        </Button>
      </Box>
    </Modal>
  );
};
export default UpdateProfilePictureModal;
