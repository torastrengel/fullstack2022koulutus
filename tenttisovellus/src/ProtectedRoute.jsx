import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';

const ProtectedRoute = ({
  children,
  token,
  isAdminRoute = false,
  redirectPath = '/',
}) => {
  const { user } = useContext(UserContext);
  if (!token) {
    return <Navigate to={redirectPath} />;
  }

  if (isAdminRoute && token) {
    if (user.isAdmin === 'true') {
      console.log('Admin oikeudet, teretulemast!');
      return children;
    } else {
      console.log('Ei admin oikeuksia!');
      return <Navigate to={redirectPath} />;
    }
  }

  return children;
};

export default ProtectedRoute;
