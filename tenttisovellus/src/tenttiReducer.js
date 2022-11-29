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

    case 'KIRJAUDU_ULOS': {
      console.log('tentitReducer:', action.type);
      localStorage.removeItem('tenttisovellus_token');
      return { ...kopio, isAuthenticated: action.payload };
    }

    case 'KIRJAUDU_SISÄÄN': {
      console.log('tentitReducer:', action.type);
      localStorage.setItem('tenttisovellus_token', action.payload.token);
      return { ...kopio, isAuthenticated: action.payload.isAuth };
    }

    case 'KYSYMYS_LISÄTTIIN': {
      console.log('tentitReducer:', action.type);
      console.log(action.payload);
      return { ...action.payload.tenttiData };
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

module.exports = tentitReducer;
