import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, token, redirectPath = '/' }) => {
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
