import Login from 'login';
import SignUp from 'login/SignUp';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from 'views/Chats';
import Events from 'views/Events';
import Profile from 'views/Profile';
import EventDetails from 'views/Events/EventDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/events" element={<Events />} exact />
      <Route path="/signUp" element={<SignUp />} exact />
      <Route path="/" element={<Login />} exact />
      <Route path="/events" element={<Events />} exact />
      <Route path="/groups" element={<Login />} exact />
      <Route path="/chats" element={<Chat />} exact />
      <Route path="/profile/:id" element={<Profile />} exact />
      <Route path="/eventDetails/:id" element={<EventDetails />} exact />
      <Route path='*' element={<Navigate to='/events' />} />
    </Routes>
  );
};

export default AppRoutes;
