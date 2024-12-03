import React from 'react';
import { Navigate } from 'react-router-dom';
import Userfront from '@userfront/toolkit';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = Userfront.accessToken();
  
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;