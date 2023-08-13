// ProtectedRoute.js

import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, ...props  }) => {
  return (
    props.loggedIn ? element : <Navigate to="/sign-in" replace/>
  )}

export default ProtectedRoute;
