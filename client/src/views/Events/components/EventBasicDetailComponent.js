import { Box, Typography } from '@mui/material';

const EventBasicDetailComponent = ({ ImageComponent, content, value }) => {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <ImageComponent
        style={{ borader: '1rem solid black', borderRadius: '1rem' }}
      />
      <Typography sx={{ fontWeight: 'bold' }}>{value}</Typography>
      <Typography sx={{ fontSize: '0.8rem', color: '#5C5C5C' }} size="small">
        {content}
      </Typography>
    </Box>
  );
};
export default EventBasicDetailComponent;
