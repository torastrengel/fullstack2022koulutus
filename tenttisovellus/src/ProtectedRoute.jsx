import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { useDecodeToken } from './hooks/useDecodeToken';

const ProtectedRoute = ({
  children,
  isAdminRoute = false,
  redirectPath = '/',
}) => {
  const { user } = useContext(UserContext);
  const { isAdmin } = useDecodeToken();
  const token = user.token;
  if (!token) {
    return <Navigate to={redirectPath} />;
  }

  if (isAdminRoute && token) {
    if (isAdmin) {
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
