import { Button } from '@mui/material';
import { useContext } from 'react';
import { TentitDispatchContext } from './TentitContext';

const SignOut = () => {
  const dispatch = useContext(TentitDispatchContext);

  const handleSignOut = async () => {
    try {
      dispatch({
        type: 'KIRJAUDU_ULOS',
        payload: null,
      });
      localStorage.removeItem('tenttisovellus_token');
    } catch (error) {
      console.error('Virhe uloskirjautuessa:', error);
      dispatch({
        type: 'VIRHE',
        payload: {
          errorMessage: 'Virhe uloskirjautumisessa!',
        },
      });
    }
  };

  return (
    <Button onClick={handleSignOut} color="inherit">
      Sign out
    </Button>
  );
};

export default SignOut;
