import {
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const MyEventCard = ({
  eventId,
  eventDate,
  eventName,
  eventPicture,
  eventCity,
}) => {
  return (
    <Box style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          display: "flex",
          border: "1px solid #F2F1F1",
          marginBottom: "1rem",
          width: "70%",
          alignItems: "center",
        }}
      >
        <Box
          style={{ backgroundColor: "#E9EB9E", height: "100%", width: "5rem" }}
        >
          <div
            style={{
              padding: "0.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>{dayjs(eventDate).format("MMM")}</Typography>
            <Typography style={{ fontSize: "2rem" }}>
              {dayjs(eventDate).format("DD")}
            </Typography>

            <Typography>{dayjs(eventDate).format("YYYY")}</Typography>
          </div>
        </Box>
        <CardMedia
          component="img"
          style={{ width: 80, height: "80%", padding: "1rem" }}
          image={eventPicture}
          alt="event"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {eventName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {eventCity}
            </Typography>
          </CardContent>
        </Box>

        <Button
          variant="contained"
          style={{ marginLeft: "auto", marginRight: "1rem" }}
          component={Link}
          to={`/eventDetails/${eventId}`}
        >
          View Details
        </Button>
      </Card>
    </Box>
  );
};
export default MyEventCard;
