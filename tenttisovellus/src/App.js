import { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function App() {
  const [tenttiNapit, setTenttiNapit] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem('tenttisovellus_token')
  );

  useEffect(() => {
    const haeTentit = async () => {
      const { data } = await axios.get('https://localhost:3001/tentit');
      const result = data.map((item) => (
        <Link key={item.id} to={`tentit/${item.id}`}>
          <Button>{item.nimi}</Button>
        </Link>
      ));
      setTenttiNapit(result);
    };
    haeTentit();
  }, []);

  const signOut = () => {
    localStorage.removeItem('tenttisovellus_token');
    setToken(null);
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="nav-header" to="/">
              Tenttisovellus
            </Link>
          </Typography>
          <Button color="inherit">Tentit</Button>
          <Button color="inherit">Tietoa sovelluksesta</Button>
          {token ? (
            <Button onClick={signOut} color="inherit">
              Sign out
            </Button>
          ) : (
            <Link to="login" color="inherit">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      {tenttiNapit}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
