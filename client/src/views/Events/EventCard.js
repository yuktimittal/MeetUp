import React, { useContext } from 'react';
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
import defaultPicture from 'assets/images/bg.jpg';
import { registerForEvent } from 'services/EventServices';
import { AppContext } from 'context/AppContext';

const EventCard = ({
  eventId,
  eventTitle,
  date,
  eventDescription,
  picture,
  isUserRegistered,
  setSelectedEventId,
  setOpenEventDrawer,
}) => {
  const { setEventList } = useContext(AppContext);
  const handleRegister = () => {
    console.log(eventId);
    registerForEvent(eventId, setEventList);
  };
  const handleEventClick = () => {
    setOpenEventDrawer(true);
    setSelectedEventId(eventId);
  };

  return (
    <Card sx={{ width: 300 }}>
      <CardHeader
        title={eventTitle}
        subheader={date}
        className="event-card-header"
        sx={{
          backgroundColor: '#E9EB9E',
          '& .MuiCardHeader-title': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '95% !important',
          },
        }}
      />
      <CardMedia
        onClick={handleEventClick}
        sx={{ cursor: 'pointer' }}
        component="img"
        height="194"
        image={picture ? picture : defaultPicture}
        alt="Trek"
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
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
            <IconButton
              aria-label="register"
              size="large"
              onClick={handleRegister}
            >
              {isUserRegistered ? (
                <HowToRegIcon style={{ color: 'teal' }} />
              ) : (
                <HowToRegIcon />
              )}
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
