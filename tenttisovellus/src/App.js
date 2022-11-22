import { useState, useReducer } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { TentitContext, TentitDispatchContext } from './TentitContext';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/* Reducer keissit - TENTIT */
const tentitReducer = (tentit, action) => {
  const kopio = JSON.parse(JSON.stringify(tentit));
  switch (action.type) {
    case 'KYSYMYS_MUUTETTIIN': {
      const { kysymys: uusiKysymys, kysymysId } = action.payload;
      const uudetKysymykset = kopio.kysymykset.map((item) => {
        if (item.id === kysymysId) {
          return { ...item, kysymys: uusiKysymys };
        } else {
          return item;
        }
      });

      return { ...kopio, kysymykset: uudetKysymykset };
    }

    case 'TENTTI_HAETTU': {
      console.log('tentitReducer:', action.type);
      return action.payload;
    }

    case 'OIKEELLISUUS_MUUTETTIIN': {
      const { uusiOikea, vastausId } = action.payload;
      const uudetVastaukset = kopio.vastaukset.map((item) => {
        if (item.id === vastausId) {
          return { ...item, oikein: uusiOikea };
        } else {
          return item;
        }
      });

      return { ...kopio, vastaukset: uudetVastaukset };
    }

    case 'VASTAUS_MUUTETTIIN': {
      console.log('tentitReducer:', action.type);
      const { uusiVastaus, vastausId, kysymysId } = action.payload;
      console.log(uusiVastaus);

      const muokattuKysymyslista = kopio.kysymykset.map((kysymys) => {
        if (kysymys.id === kysymysId) {
          return {
            ...kysymys,
            vastausvaihtoehdot: kysymys.vastausvaihtoehdot.map((vastaus) => {
              if (vastaus.id === vastausId) {
                return { ...vastaus, teksti: uusiVastaus };
              } else {
                return vastaus;
              }
            }),
          };
        } else {
          return kysymys;
        }
      });

      console.log(muokattuKysymyslista);

      return { ...kopio, kysymykset: muokattuKysymyslista };
    }

    case 'KYSYMYS_LISÄTTIIN': {
      return { ...action.payload };
    }

    case 'ALUSTA_DATA':
      console.log('Data alustetaan...');
      return action.payload;

    case 'VAIHDA_TENTTI':
      console.log('Tentti vaihdettu');
      return { ...action.payload };

    case 'PÄIVITÄ_TALLENNUS':
      kopio.dataSaved = action.payload.dataSaved;
      return kopio;

    default:
      throw new Error(
        'Joko actionia ei ole määritetty tai suoritit jotain uskomatonta'
      );
  }
};

function App() {
  const [tentit, dispatch] = useReducer(tentitReducer, {});
  const [tenttiNapit, setTenttiNapit] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem('tenttisovellus_token')
  );

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
          <Link to="tentit" color="inherit">
            <Button color="inherit">Tentit</Button>
          </Link>
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
        <TentitContext.Provider value={tentit}>
          <TentitDispatchContext.Provider value={dispatch}>
            <Outlet />
          </TentitDispatchContext.Provider>
        </TentitContext.Provider>
      </div>
    </div>
  );
}

export default App;
