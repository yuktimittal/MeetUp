import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import EventCard from './EventCard';
import './index.css';
import Grid from '@mui/material/Grid';
import { Alert, Snackbar } from '@mui/material';
import { WELCOME_MSG, WELCOME_TEXT } from './constants';
import { getAllEvents } from 'services/EventServices.js';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'context/AppContext';
import EventDrawer from './EventDrawer';
import RegistrationConfirmationModal from './components/RegistrationConfirmationModal';
import { registerForEvent } from 'services/EventServices';

const Events = () => {
  const { eventsList, setEventsList } = useContext(AppContext);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('user'));

  const [openEventDrawer, setOpenEventDrawer] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState();
  const [selectedEvent, setSelectedEvent] = useState();
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState();

  const handleRegister = async (eventId) => {
    var res = await registerForEvent(eventId, setEventsList);
    if (res?.success) {
      setAlertSeverity({ success: true, message: 'Registered successfully' });
    } else setAlertSeverity({ success: false, message: res.message });
    setShowAlert(true);
    setOpenRegistrationModal(false);
    setOpenEventDrawer(false);
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/events');
    }
  }, [navigate]);

  useEffect(() => {
    getAllEvents(setEventsList);
  }, []);
  const checkRegistration = (event) => {
    const registeredUser = event?.registrations?.find(
      (registration) => registration.user === userInfo?.id
    );
    if (registeredUser) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    let foundEvent = eventsList.find((event) => event?._id === selectedEventId);
    setSelectedEvent(foundEvent);
  }, [selectedEventId]);

  return (
    <div className="home-page">
      <div className="bg-image">
        <div className="welcome-text">{WELCOME_TEXT}</div>
        <h3 className="welcome-text1">{WELCOME_MSG}</h3>
      </div>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'middle' }}
        sx={{ mt: 8 }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity={alertSeverity?.success ? 'success' : 'error'}
        >
          {alertSeverity?.message}
        </Alert>
      </Snackbar>
      <Grid
        item
        container
        justifyContent="center"
        columnSpacing={{ xs: 2, sm: 4, md: 6 }}
        rowSpacing={{ xs: 2, sm: 2, md: 3 }}
        className="event-cards"
      >
        {eventsList &&
          eventsList?.map((event) => (
            <Grid key={event?._id} item>
              <EventCard
                key={event?._id}
                eventId={event?._id}
                eventTitle={event?.name}
                date={dayjs(event?.eventDate).format('MMMM DD,YYYY')}
                eventDescription={event?.description}
                picture={event?.picture}
                isUserRegistered={checkRegistration(event)}
                setSelectedEventId={setSelectedEventId}
                setOpenEventDrawer={setOpenEventDrawer}
                setOpenRegistrationModal={setOpenRegistrationModal}
              />
            </Grid>
          ))}
      </Grid>
      <EventDrawer
        key={selectedEventId}
        selectedEvent={selectedEvent}
        openEventDrawer={openEventDrawer}
        setOpenEventDrawer={setOpenEventDrawer}
        setOpenRegistrationModal={setOpenRegistrationModal}
        isUserRegistered={checkRegistration(selectedEvent)}
      />
      <RegistrationConfirmationModal
        openRegistrationModal={openRegistrationModal}
        setOpenRegistrationModal={setOpenRegistrationModal}
        selectedEvent={selectedEvent}
        handleRegister={handleRegister}
      />
    </div>
  );
};

export default Events;
