import { useState, useReducer, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { TentitContext, TentitDispatchContext } from './TentitContext';

import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';

import axios from 'axios';
import TenttiLista from './TenttiLista';
import Tentti from './Tentti';

/* Reducer keissit - TENTIT */
const tentitReducer = (tentit, action) => {
  const kopio = JSON.parse(JSON.stringify(tentit));
  switch (action.type) {
    case 'KYSYMYS_MUUTETTIIN': {
      console.log('tentitReducer:', action.type);
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
      return { ...action.payload, dataInitialized: true };
    }

    case 'OIKEELLISUUS_MUUTETTIIN': {
      console.log('tentitReducer:', action.type);
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

      return { ...kopio, kysymykset: muokattuKysymyslista };
    }

    case 'VIRHE': {
      console.log('tentitReducer:', action.type);
      return { ...kopio, ...action.payload };
    }

    case 'KYSYMYS_LISÄTTIIN': {
      console.log('tentitReducer:', action.type);
      return { ...action.payload };
    }

    case 'ALUSTA_DATA':
      console.log('Data alustetaan...');
      return action.payload;

    case 'VAIHDA_TENTTI':
      console.log('Tentti vaihdettu');
      return { ...action.payload };

    case 'PÄIVITÄ_TALLENNUS':
      console.log('tentitReducer:', action.type);
      kopio.dataSaved = action.payload.dataSaved;
      return kopio;

    default:
      console.log('tentitReducer: default');
      throw new Error(
        'Joko actionia ei ole määritetty tai suoritit jotain uskomatonta'
      );
  }
};

function App() {
  const [tentit, dispatch] = useReducer(tentitReducer, {});
  const [token, setToken] = useState(
    localStorage.getItem('tenttisovellus_token')
  );

  useEffect(() => {
    const isTokenValid = async () => {
      const { data } = await axios.post('https://localhost:3001/token', {
        token: localStorage.getItem('tenttisovellus_token'),
      });
      if (!data.success) {
        signOut();
      }
    };
    localStorage.getItem('tenttisovellus_token') && isTokenValid();
  }, []);

  const signOut = () => {
    localStorage.removeItem('tenttisovellus_token');
    setToken(null);
  };

  return (
    <TentitContext.Provider value={tentit}>
      <TentitDispatchContext.Provider value={dispatch}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="tentit" element={<TenttiLista />} />
            <Route path="tentit/:id" element={<Tentti />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </TentitDispatchContext.Provider>
    </TentitContext.Provider>
  );
}

export default App;
