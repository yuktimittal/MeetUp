import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import defaultPicture from "assets/images/bg.jpg";
import { Link } from "react-router-dom";

const EventCard = ({ eventId, eventTitle, date, picture, location }) => {
  return (
    <Card sx={{ width: 300 }}>
      <Link to={`/eventDetails/${eventId}`} style={{ textDecoration: "none" }}>
        <CardMedia
          sx={{ cursor: "pointer" }}
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
              width: "100%",
              fontWeight: "bold",
            }}
          >
            {eventTitle}
          </Typography>
          <Typography
            variant="h7"
            color="text.primary"
            style={{
              width: "100%",
            }}
          >
            {date}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {location ? location : "Jai Club: Jaipur"}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default EventCard;
