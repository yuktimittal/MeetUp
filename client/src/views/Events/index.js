import React, { useEffect } from 'react';
import EventCard from './EventCard';
import './index.css';
import Grid from '@mui/material/Grid';
import { WELCOME_MSG, WELCOME_TEXT } from './constants';
import axios from 'axios';
import { authHeader } from 'login/services';

const Events = () => {
  const getUsers = async () => {
    await axios
      .get('/user', { headers: authHeader() })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUsers();
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
        {[...Array(5)].map((_, i) => (
          <Grid key={i} item>
            <EventCard
              eventTitle={'Nahargarh Trek'}
              date={'September 10, 2022'}
              eventDescription={
                'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
              }
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Events;