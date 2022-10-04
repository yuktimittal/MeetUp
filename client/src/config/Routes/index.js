import Login from 'login';
import SignUp from 'login/SignUp';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Events from 'views/Events';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Events />} exact />
      <Route path="/signUp" element={<SignUp />} exact />
      <Route path="/login" element={<Login />} exact />
      <Route path="/events" element={<Events />} exact />
      <Route path="/groups" element={<Login />} exact />
    </Routes>
  );
};

export default AppRoutes;
