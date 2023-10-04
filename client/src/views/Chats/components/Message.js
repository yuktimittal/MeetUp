import React from 'react';
import { Grid, ListItem, ListItemText } from '@mui/material';
const MessageContainer = ({ index, align, text, profilePicture, time }) => {
  return (
    <ListItem key={index}>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align={align} primary={text}></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText align={align} secondary={time}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
};
export default MessageContainer;
