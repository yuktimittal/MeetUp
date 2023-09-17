import React, { useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import EventCard from './EventCard';
import './index.css';
import Grid from '@mui/material/Grid';
import { WELCOME_MSG, WELCOME_TEXT } from './constants';
import { getAllEvents } from 'services/EventServices.js';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'context/AppContext';

const Events = () => {
  const { eventsList, setEventsList } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));

    if (userInfo) {
      navigate('/events');
    }
  }, [navigate]);

  useEffect(() => {
    getAllEvents(setEventsList);
  }, []);

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
                eventId={event?._id}
                eventTitle={event?.name}
                date={dayjs(event?.eventDate).format('MMMM DD,YYYY')}
                eventDescription={event?.description}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Events;
