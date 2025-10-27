import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const {user, loading} = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
      return <LoadingSpinner />;  // ✅ এখানেও দেখাবে
    }
    
    if(user){
        return children;
    }

    // console.log(location.pathname)
    return <Navigate state={location.pathname} to={user ?? "/login"}></Navigate>
};

export default PrivateRoute;
