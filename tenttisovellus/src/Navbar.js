import { Link, Outlet } from 'react-router-dom';
import SignOut from './SignOut';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  const hasToken = localStorage.getItem('tenttisovellus_token');
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="nav-header" to="/">
              Tenttisovellus
            </Link>
          </Typography>
          <Link to="tentit" color="inherit">
            <Button color="inherit">Tentit</Button>
          </Link>
          {hasToken ? (
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
