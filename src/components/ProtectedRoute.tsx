import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { usePolyverseContext } from '../context/Auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [user, setUser] = useState(true);
  const { address } = usePolyverseContext();

  if (!address) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;