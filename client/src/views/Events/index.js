import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import EventCard from './EventCard';
import './index.css';
import Grid from '@mui/material/Grid';
import { WELCOME_MSG, WELCOME_TEXT } from './constants';
import { getAllEvents } from 'services/EventServices.js';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'context/AppContext';
import EventDrawer from './EventDrawer';

const Events = () => {
  const { eventsList, setEventsList } = useContext(AppContext);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('user'));

  const [openEventDrawer, setOpenEventDrawer] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState();
  const [selectedEvent, setSelectedEvent] = useState();

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
              />
            </Grid>
          ))}
      </Grid>
      <EventDrawer
        key={selectedEventId}
        selectedEvent={selectedEvent}
        openEventDrawer={openEventDrawer}
        setOpenEventDrawer={setOpenEventDrawer}
      />
    </div>
  );
};

export default Events;
