import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
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
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EventCard;
