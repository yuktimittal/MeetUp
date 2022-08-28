import EventCard from './EventCard';
import './index.css';
import Grid from '@mui/material/Grid';
import { WELCOME_MSG, WELCOME_TEXT } from './constants';

const Events = () => {
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
            <EventCard />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Events;
