// import React from 'react'
// import { useAuth } from '../context/AuthContext'
// import { Navigate } from 'react-router-dom'

// const PrivateRoute = ({children}) => {
//     const {currentUser, loading} = useAuth();

//     if(loading) {
//         return <div>Loading..</div>
//     }
//     if(currentUser,loading) {
//         return children;
//     }
  
//     return <Navigate to="/login" replace/>
// }

// export default PrivateRoute


import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading..</div>;
  }

  if (currentUser) {
    return children;
  }

  // Redirect to login and save the current location in state
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
