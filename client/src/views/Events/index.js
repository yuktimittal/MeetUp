import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import EventCard from './EventCard';
import './index.css';
import Grid from '@mui/material/Grid';
import { WELCOME_MSG, WELCOME_TEXT } from './constants';
import EventServices from 'services/EventServices.js';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [eventsList, setEventsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));

    if (userInfo) {
      navigate('/events');
    }
  }, [navigate]);

  useEffect(() => {
    EventServices(setEventsList);
  }, []);

  return (
    <div className="home-page">
      <div className="bg-image">
        <div className="welcome-text">{WELCOME_TEXT}</div>
        <h3 className="welcome-text1">{WELCOME_MSG}</h3>
      </div>
      <Grid
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
                eventTitle={event?.name}
                date={dayjs(event?.eventDate).format('MMMM DD,YYYY')}
                eventDescription={event?.description}
              />
            </Grid>
          ))}
        {/* {[...Array(5)].map((_, i) => (
          <Grid key={i} item>
            <EventCard
              eventTitle={'Nahargarh Trek'}
              date={'September 10, 2022'}
              eventDescription={
                'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
              }
            />
          </Grid>
        ))} */}
      </Grid>
    </div>
  );
};

export default Events;
