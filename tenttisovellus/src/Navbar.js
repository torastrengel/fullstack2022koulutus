import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
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
          <Button color="inherit">Tietoa sovelluksesta</Button>
          <Link to="login" color="inherit">
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Navbar;
