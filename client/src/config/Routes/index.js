import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Events from 'views/Events';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Events />} exact />
    </Routes>
  );
};

export default AppRoutes;
