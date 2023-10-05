import { Avatar, Box, Typography, IconButton } from '@mui/material';
import './index.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserById } from 'services/UserServices';

import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import UpdateProfilePictureModal from './UpdateProfilePictureModal';
import AboutSection from './AboutSection';

const Profile = () => {
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState();

  const [aboutContent, setAboutContent] = useState();
  const [profilePic, setProfilePic] = useState();
  const [openUpdateProfileModal, setOpenUpdateProfileModal] = useState(false);

  useEffect(() => {
    getUserById(id, setProfileUser);
    setAboutContent(profileUser?.about);
  }, []);

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

      <AboutSection
        id={id}
        profileUser={profileUser}
        setProfileUser={setProfileUser}
        aboutContent={aboutContent}
        setAboutContent={aboutContent}
      />

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
