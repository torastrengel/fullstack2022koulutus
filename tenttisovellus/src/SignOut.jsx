import { Button } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

const SignOut = () => {
  const { setUser, setIsAuth } = useContext(UserContext);
  const handleSignOut = () => {
    try {
      localStorage.removeItem('tenttisovellus_token');
      localStorage.removeItem('tenttisovellus_user_id');
      localStorage.removeItem('tenttisovellus_user_email');
      localStorage.removeItem('tenttisovellus_user_is_admin');
      setUser({ token: null });
      setIsAuth(false);
    } catch (error) {
      console.error('Virhe uloskirjautuessa:', error);
    }
  };

  return (
    <Button onClick={handleSignOut} color="inherit">
      Sign out
    </Button>
  );
};

export default SignOut;
