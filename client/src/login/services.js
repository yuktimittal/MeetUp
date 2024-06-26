import axios from 'axios';
export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
};

export const signOut = (setUser, navigate) => {
  localStorage.removeItem('user');
  setUser({});
  navigate('/');
};

export const signUp = (userDetails) => {
  axios.post('/auth/signup', userDetails);
};
