import { Avatar, Box, Typography, IconButton } from '@mui/material';
import './index.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserById, updateUser } from 'services/UserServices';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import UpdateProfilePictureModal from './UpdateProfilePictureModal';

const Profile = () => {
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState();
  const [aboutEditable, setAboutEditable] = useState(false);
  const [aboutContent, setAboutContent] = useState();
  const [profilePic, setProfilePic] = useState();
  const [openUpdateProfileModal, setOpenUpdateProfileModal] = useState(false);

  useEffect(() => {
    getUserById(id, setProfileUser);
    setAboutContent(profileUser?.about);
  }, []);
  const handleEditing = () => {
    setAboutEditable(true);
  };
  const handleAboutChange = (e) => {
    setAboutContent(e.target.innerText);
  };

  const updateProfilePicture = (pic) => {
    if (pic === undefined) {
      console.log('Please select an image');
      return;
    }
    if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
      const data = new FormData();
      data.append('file', pic);
      data.append('upload_preset', 'meet-up');
      data.append('cloud_name', 'dn02dvrtg');

      fetch('https://api.cloudinary.com/v1_1/dn02dvrtg/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setProfilePic(data.url.toString());
          setOpenUpdateProfileModal(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('select an image');
      return;
    }
  };

  const handleAboutSubmit = () => {
    let userDetails = { about: aboutContent };
    updateUser(id, userDetails, setProfileUser);
    setAboutEditable(false);
  };

  return (
    <div className="profile-body">
      <UpdateProfilePictureModal
        id={id}
        openUpdateProfileModal={openUpdateProfileModal}
        setOpenUpdateProfileModal={setOpenUpdateProfileModal}
        profilePic={profilePic}
        setProfilePic={setProfilePic}
        setProfileUser={setProfileUser}
      />
      <div className="profile-bg-image">
        <Box className="user-profile-photo">
          <Avatar
            sx={{ width: 112, height: 112 }}
            src={profileUser?.profilePicture}
          ></Avatar>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="icon-button-file"
            type="file"
            onChange={(e) => updateProfilePicture(e.target.files[0])}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              component="span"
              sx={{
                right: '2rem',
                top: '4rem',
                '&:hover ': { backgroundColor: 'transparent' },
              }}
            >
              <AddAPhotoOutlinedIcon
                type
                sx={{
                  fontSize: '1.8rem',
                  color: 'primary',
                }}
              />
            </IconButton>
          </label>
          <div style={{ marginTop: '1rem' }}>
            <p className="profile-name">{profileUser?.name}</p>
            <p className="profile-name">{profileUser?.email}</p>
          </div>
        </Box>
      </div>
      <Box className="user-about-section">
        <div style={{ padding: '1rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>About Me</Typography>
            {!aboutEditable && (
              <IconButton onClick={handleEditing}>
                <ModeEditIcon />
              </IconButton>
            )}
          </div>
          {profileUser?.about || aboutEditable ? (
            <Typography
              contentEditable={aboutEditable}
              suppressContentEditableWarning={true}
              onInput={handleAboutChange}
              onBlur={handleAboutSubmit}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleAboutSubmit(event);
                }
              }}
              flexGrow={1}
            >
              {profileUser?.about}
            </Typography>
          ) : (
            <span style={{ fontStyle: 'italic', color: 'grey' }}>
              Write something about yourself
            </span>
          )}
        </div>
      </Box>
      <Box className="user-profile-other-info">
        <div style={{ padding: '1rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Other Info</Typography>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default Profile;
