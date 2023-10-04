import Login from 'login';
import SignUp from 'login/SignUp';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from 'views/Chats';
import Events from 'views/Events';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/events" element={<Events />} exact />
      <Route path="/signUp" element={<SignUp />} exact />
      <Route path="/" element={<Login />} exact />
      <Route path="/events" element={<Events />} exact />
      <Route path="/groups" element={<Login />} exact />
      <Route path="/chats" element={<Chat />} exact />
    </Routes>
  );
};

export default AppRoutes;
