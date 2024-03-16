import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import defaultPicture from 'assets/images/bg.jpg';

const EventCard = ({
  eventId,
  eventTitle,
  date,
  eventDescription,
  picture,
  isUserRegistered,
  isUserInterested,
  setSelectedEventId,
  setOpenEventDrawer,
  setOpenRegistrationModal,
  toggleInterest,
}) => {
  const handleEventClick = () => {
    setOpenEventDrawer(true);
    setSelectedEventId(eventId);
  };

  return (
    <Card sx={{ width: 300 }}>
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
          variant="h6"
          color="text.primary"
          style={{
            width: '100%',
            fontWeight: 'bold',
          }}
        >
          {eventTitle}
        </Typography>
        <Typography
          variant="h7"
          color="text.primary"
          style={{
            width: '100%'
          }}
        >
          {date}
        </Typography>
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
          Jai Club: Jaipur
        </Typography>

      </CardContent>

    </Card>
  );
};

export default EventCard;
