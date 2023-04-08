import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import picture from 'assets/images/bg.jpg';

const EventCard = ({ eventTitle, date, eventDescription }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={eventTitle}
        subheader={date}
        className="event-card-header"
      />
      <CardMedia component="img" height="194" image={picture} alt="Trek" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {eventDescription}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '0rem',
          marginTop: '-0.5rem',
        }}
      >
        <div>
          <Tooltip id="button-report" title="Register">
            <IconButton aria-label="register" size="large">
              <HowToRegIcon />
            </IconButton>
          </Tooltip>
          <IconButton aria-label="share" size="large">
            <ShareIcon />
          </IconButton>
        </div>
        <div>
          <IconButton aria-label="add to favorites" size="large">
            <FavoriteIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default EventCard;
