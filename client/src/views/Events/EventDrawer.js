import * as React from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  IconButton,
} from '@mui/material';
import dayjs from 'dayjs';
import defaultPicture from 'assets/images/bg.jpg';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import EventBasicDetailComponent from './components/EventBasicDetailComponent';
import CancelIcon from '@mui/icons-material/Cancel';

const EventDrawer = ({
  selectedEvent,
  openEventDrawer,
  setOpenEventDrawer,
  setOpenRegistrationModal,
  isUserRegistered,
}) => {
  const toggleDrawer = (state) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpenEventDrawer(state);
  };
  const handleEventRegistration = () => {
    setOpenRegistrationModal(true);
  };

  const drawerContent = () => (
    <Box sx={{ width: 500 }} role="presentation">
      <div style={{ position: 'relative' }}>
        <IconButton
          onClick={toggleDrawer(false)}
          style={{ float: 'right', position: 'absolute' }}
        >
          <CancelIcon />
        </IconButton>
        <img
          style={{ height: 400, width: 500 }}
          src={selectedEvent?.picture ? selectedEvent?.picture : defaultPicture}
          alt=""
        />
      </div>

      <Typography variant="h5" style={{ textAlign: 'center' }}>
        {selectedEvent?.name}
      </Typography>
      <Typography style={{ textAlign: 'center' }}>
        {dayjs(selectedEvent?.eventDate).format('MMMM DD,YYYY')}
      </Typography>

      <Box
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={handleEventRegistration}
          disabled={isUserRegistered}
        >
          {!isUserRegistered ? 'Register' : 'Registered'}
        </Button>
      </Box>
      <Box
        style={{
          marginTop: '1.5rem',
          display: 'flex',

          justifyContent: 'space-evenly',
        }}
      >
        <EventBasicDetailComponent
          ImageComponent={HowToRegOutlinedIcon}
          content={'Registrations'}
          value={selectedEvent?.registrations?.length}
        />
        <EventBasicDetailComponent
          ImageComponent={AddLocationAltOutlinedIcon}
          content={selectedEvent?.eventMode === 'Online' ? 'Online' : 'away'}
          value={'0 KM'}
        />
        <EventBasicDetailComponent
          ImageComponent={FavoriteBorderOutlinedIcon}
          content={'Interests'}
          value={selectedEvent?.interests?.length}
        />
      </Box>

      <Divider style={{ marginTop: '1rem' }} />
      <Typography
        variant="h6"
        sx={{ paddingLeft: '1rem', marginTop: '0.5rem', fontWeight: 'bold' }}
      >
        About
      </Typography>
      <Typography sx={{ paddingLeft: '1rem' }}>
        {selectedEvent?.description}
      </Typography>
      <Typography
        variant="h6"
        sx={{ paddingLeft: '1rem', marginTop: '0.5rem', fontWeight: 'bold' }}
      >
        Venue
      </Typography>
      <Typography sx={{ paddingLeft: '1rem' }}>{'lorem ipsum '}</Typography>
    </Box>
  );

  return (
    <Drawer
      anchor={'right'}
      open={openEventDrawer}
      onClose={toggleDrawer(false)}
    >
      {drawerContent()}
    </Drawer>
  );
};

export default EventDrawer;
