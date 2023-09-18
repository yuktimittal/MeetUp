import React, { useContext, useState } from 'react';
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createEvent } from 'services/EventServices';
import { AppContext } from 'context/AppContext';

const EventForm = ({ openEventForm, setOpenEventForm }) => {
  const [name, setName] = useState('');
  const [description, setDesription] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [eventMode, setEventMode] = useState('');
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState('');
  const { setEventsList } = useContext(AppContext);

  const handleCloseEventForm = () => {
    setOpenEventForm(false);
    setName(null);
    setDesription(null);
    setEventDate(null);
    setEventMode(null);
  };
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
  const modes = [
    {
      value: 'Online',
      label: 'Online',
    },
    {
      value: 'Offline',
      label: 'Offline',
    },
  ];

  const handleCreateEvent = () => {
    createEvent(
      name,
      description,
      eventDate,
      eventMode,
      picture,
      setOpenEventForm,
      setEventsList
    );

    setName(null);
    setDesription(null);
    setEventDate(null);
    setEventMode(null);
  };

  const uploadPic = (pic) => {
    setLoading(true);
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
          setPicture(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      console.log('select an image');
      setLoading(false);
      return;
    }
  };

  return (
    <Modal open={openEventForm} onClose={handleCloseEventForm}>
      <Box sx={style}>
        <Typography
          flexGrow={1}
          variant="h5"
          color="#1F8A70"
          textAlign="center"
          marginBottom="1.5rem"
        >
          Create New Event
        </Typography>
        <TextField
          label={'Name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 2, width: '100%' }}
        />
        <TextField
          label={'Description'}
          value={description}
          onChange={(e) => setDesription(e.target.value)}
          multiline
          rows={2}
          sx={{ mt: 2, width: '100%' }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={eventDate}
            onChange={(value) => setEventDate(value)}
            label="Event Date"
            sx={{ mt: 2, width: '100%' }}
          />
        </LocalizationProvider>

        <TextField
          label={'Mode'}
          select
          sx={{ mt: 2, width: '100%' }}
          value={eventMode}
          onChange={(e) => setEventMode(e.target.value)}
        >
          {modes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <InputLabel sx={{ mt: 2 }}>{'Upload event poster'}</InputLabel>
        <FormControl>
          <Input
            sx={{ width: '45ch !important' }}
            placeholder="Upload event poster"
            name="picture"
            type="file"
            accept="image/*"
            p={1.5}
            onChange={(e) => uploadPic(e.target.files[0])}
          />
        </FormControl>

        <Button
          onClick={handleCreateEvent}
          disabled={loading}
          variant="contained"
          sx={{
            mt: 2,
            width: '100%',
          }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};
export default EventForm;
