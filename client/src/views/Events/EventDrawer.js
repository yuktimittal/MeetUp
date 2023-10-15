import * as React from 'react';
import { Box, Button, Divider, Drawer, Typography } from '@mui/material';
import dayjs from 'dayjs';
import defaultPicture from 'assets/images/bg.jpg';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import EventBasicDetailComponent from './components/EventBasicDetailComponent';

const EventDrawer = ({
  selectedEvent,
  openEventDrawer,
  setOpenEventDrawer,
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

  const drawerContent = () => (
    <Box
      sx={{ width: 500 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <img
        style={{ height: 400, width: 500 }}
        src={selectedEvent?.picture ? selectedEvent?.picture : defaultPicture}
        alt=""
      />
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
        <Button color="primary" variant="contained">
          Register
        </Button>
        <Button
          color="primary"
          variant="outlined"
          style={{ marginLeft: '1rem' }}
        >
          Mark Interested
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

      <div></div>
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
