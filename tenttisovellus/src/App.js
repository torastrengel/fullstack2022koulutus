import MainContent from './MainContent';
import './App.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function App() {
  return (
    <div>
      <AppBar position="static" color='primary'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tenttisovellus
          </Typography>
          <Button color="inherit">Tentit</Button>
          <Button color="inherit">Tietoa sovelluksesta</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <MainContent />
    </div>
  );
}

export default App;
