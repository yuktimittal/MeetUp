import { useState } from 'react';
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Alert,
  Grid,
  CssBaseline,
  Paper,
  Typography,
  Snackbar,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import './index.css';
import { Link, Navigate } from 'react-router-dom';
import drinks from 'assets/images/drinks_green.svg';
import {
  DONT_HAVE_ACCOUNT,
  REGISTER,
  LOGIN,
  WELCOME_BACK_TEXT,
  LOGIN_INPUT_LABELS,
  LOGIN_KEYS,
  LOGIN_SUCCESS_MSG,
  USER,
} from './constants';
import { APP_NAME_MULAKAAT } from 'constants';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: null,
    password: null,
  });
  const [isSignedUp, setIsSignedUp] = useState({
    successful: false,
    message: null,
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (value, field) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignUp = async () => {
    await axios
      .post('/auth/signin', userDetails)
      .then((res) => {
        setIsSignedUp({
          successful: true,
          message: LOGIN_SUCCESS_MSG,
        });
        if (res.data.accessToken) {
          localStorage.setItem(USER, JSON.stringify(res.data));
        }
      })
      .catch((err) => {
        setIsSignedUp({
          successful: false,
          message: err?.response?.data?.message,
        });
      });
    setShowAlert(true);

    setUserDetails({ email: null, password: null });
  };

  if (isSignedUp?.successful) {
    return <Navigate to="/events" />;
  }

  return (
    <>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 8 }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity={isSignedUp?.successful ? 'success' : 'error'}
        >
          {isSignedUp?.message}
        </Alert>
      </Snackbar>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ pl: 10 }}
        >
          <Box
            component="form"
            className="login-app-logo"
            noValidate
            autoComplete="off"
          >
            <img className="login-app-logo-image" src={drinks} alt="app-logo" />

            <Typography
              variant="h4"
              component="div"
              color="primary"
              className="login-logo-name"
            >
              {APP_NAME_MULAKAAT}
            </Typography>
          </Box>
          <Box className="login-welcome-text">{WELCOME_BACK_TEXT}</Box>
          <Box
            component="form"
            className="login-form"
            noValidate
            autoComplete="off"
          >
            <Box className="login-form-inputs">
              <TextField
                label={LOGIN_INPUT_LABELS.EMAIL}
                fullWidth
                value={userDetails?.email}
                onChange={(e) => handleChange(e.target.value, LOGIN_KEYS.EMAIL)}
              />

              <FormControl
                fullWidth
                className="login-form-input-field"
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  {LOGIN_INPUT_LABELS.PASSWORD}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={userDetails?.password}
                  onChange={(e) =>
                    handleChange(e.target.value, LOGIN_KEYS.PASSWORD)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button
                onClick={handleSignUp}
                className="login-btn"
                variant="contained"
              >
                {LOGIN}
              </Button>
            </Box>

            <div>
              {DONT_HAVE_ACCOUNT} <Link to="/signUp">{REGISTER}</Link>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
