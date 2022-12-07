import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from './context/UserContext';

import SignOut from './SignOut';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const isLoggedIn = user.token;

  return (
    <>
      <AppBar
        position="static"
        style={{ backgroundColor: user.isAdmin ? '#F34213' : '#F9DC5C' }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="nav-header" to="/">
              Tenttisovellus
            </Link>
          </Typography>
          <Link to="tentit" color="inherit">
            <Button color="inherit">Tentit</Button>
          </Link>
          {user.isAdmin && (
            <Link to="admin/lisaatentti">
              <Button color="inherit">Uusi tentti</Button>
            </Link>
          )}
          {user.isAdmin && (
            <Link to="admin/poistatentti" color="inherit">
              <Button color="inherit">Poista tentteja</Button>
            </Link>
          )}
          {isLoggedIn ? (
            <SignOut />
          ) : (
            <Link to="login" color="inherit">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Navbar;
