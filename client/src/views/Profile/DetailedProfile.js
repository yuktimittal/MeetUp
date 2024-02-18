import { useState, useEffect } from 'react';
import {
  Typography,
  IconButton,
  Box,
  Toolbar,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import dayjs from 'dayjs';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { GenderChoices } from 'constants';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { updateUser } from 'services/UserServices';

const DetailedProfile = ({
  id,
  editingAllowed,
  profileUser,
  setProfileUser,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [contact, setContact] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();

  useEffect(() => {
    if (profileUser) {
      setContact(profileUser?.contact);
      setGender(profileUser?.gender);
      setDob(profileUser?.dob);
    }
  }, [profileUser]);

  const handleEditMode = () => {
    setEditMode(true);
  };

  const getFieldValue = (value) => {
    if (!value && !editMode) return 'Not Available';
    return value;
  };
  const cancelSubmit = () => {
    setEditMode(false);
    setContact(profileUser?.contact);
    setGender(profileUser?.gender);
    setDob(profileUser?.dob);
  };

  const handleProfileSubmit = () => {
    const userDetails = { contact: contact, gender: gender, dob: dob };
    updateUser(id, userDetails, setProfileUser);
    setEditMode(false);
  };
  return (
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
          {editingAllowed && !editMode && (
            <IconButton onClick={handleEditMode}>
              <ModeEditIcon />
            </IconButton>
          )}
        </div>
        <Box>
          <Toolbar className="detailed-profile-fields">
            <Typography className="detailed-profile-field-label">
              contact :
            </Typography>
            {!editMode ? (
              <Typography>{getFieldValue(profileUser?.contact)}</Typography>
            ) : (
              <TextField
                className="testtt"
                size="small"
                type="tel"
                value={contact}
                sx={{ width: '12.5%' }}
                onChange={(e) => setContact(e.target.value)}
              ></TextField>
            )}
          </Toolbar>

          <Toolbar className="detailed-profile-fields">
            <Typography className="detailed-profile-field-label">
              gender :
            </Typography>
            {!editMode ? (
              <Typography>{getFieldValue(profileUser?.gender)}</Typography>
            ) : (
              <TextField
                select
                size="small"
                // inputProps={{
                //   style: {
                //     height: '100px',
                //   },
                // }}

                sx={{ width: '12.5%' }}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                {GenderChoices.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Toolbar>

          <Toolbar className="detailed-profile-fields">
            <Typography className="detailed-profile-field-label">
              date of birth :
            </Typography>
            {!editMode ? (
              <Typography>
                {profileUser?.dob
                  ? dayjs(profileUser?.dob).format('MMMM DD, YYYY')
                  : getFieldValue(profileUser?.dob)}
              </Typography>
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  size="small"
                  value={dayjs(dob)}
                  onChange={(value) => setDob(value)}
                  inputProps={{ size: 'small' }}
                  sx={{ width: '10%' }}
                />
              </LocalizationProvider>
            )}
          </Toolbar>
        </Box>
        {editMode && (
          <>
            <Button
              variant="outlined"
              color="error"
              onClick={cancelSubmit}
              style={{ marginRight: '1rem' }}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleProfileSubmit}>
              Submit
            </Button>
          </>
        )}
      </div>
    </Box>
  );
};
export default DetailedProfile;
