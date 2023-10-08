import { useState } from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { updateUser } from 'services/UserServices';

const AboutSection = ({
  id,
  profileUser,
  setProfileUser,
  aboutContent,
  setAboutContent,
  editingAllowed,
}) => {
  const [aboutEditable, setAboutEditable] = useState(false);

  const handleEditing = () => {
    setAboutEditable(true);
  };

  const handleAboutChange = (e) => {
    setAboutContent(e.target.innerText);
  };

  const handleAboutSubmit = () => {
    let userDetails = { about: aboutContent };
    updateUser(id, userDetails, setProfileUser);
    setAboutEditable(false);
  };

  return (
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
          {!aboutEditable && editingAllowed && (
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
            {editingAllowed
              ? `Write something about yourself`
              : `Not Available`}
          </span>
        )}
      </div>
    </Box>
  );
};

export default AboutSection;
