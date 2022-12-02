/* Reducer keissit - TENTIT */
const tenttiReducer = (tentit, action) => {
  const kopio = JSON.parse(JSON.stringify(tentit));
  switch (action.type) {
    case 'ADMIN/TENTIT_HAETTU': {
      console.log('tenttiReducer', action.type);
      return { ...kopio, tenttilista: action.payload };
    }

    case 'ADMIN/POISTA_TENTTI': {
      console.log('tenttiReducer', action.type);
      const uudetTentit = kopio.tenttilista.filter(
        (item) => item.id !== action.payload
      );
      return { ...kopio, tenttilista: uudetTentit };
    }

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
      return { ...action.payload };
    }

    case 'OIKEELLISUUS_MUUTETTIIN': {
      console.log('tentitReducer:', action.type);
      const { uusiOikea, vastausId } = action.payload;
      const uudetVastaukset = kopio.kysymykset.map((kysymys) => {
        return {
          ...kysymys,
          vastausvaihtoehdot: kysymys.vastausvaihtoehdot.map((vastaus) => {
            if (vastausId === vastaus.id) {
              return { ...vastaus, oikein: uusiOikea };
            } else {
              return vastaus;
            }
          }),
        };
      });

      return { ...kopio, kysymykset: uudetVastaukset };
    }

    case 'VASTAUS_MUUTETTIIN': {
      console.log('tentitReducer:', action.type);
      const { uusiVastaus, vastausId, kysymysId } = action.payload;

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
      return {
        ...kopio,
        user: {
          isAuthenticated: action.payload.isAuth,
          token: action.payload.token,
        },
      };
    }

    case 'KIRJAUDU_SISÄÄN': {
      console.log('tentitReducer:', action.type);
      return {
        ...kopio,
        user: {
          isAuthenticated: action.payload.isAuth,
          token: action.payload.token,
        },
      };
    }

    case 'KYSYMYS_LISÄTTIIN': {
      console.log('tentitReducer:', action.type);
      const { kysymys_id, kysymys, vaihtoehdot } = action.payload;
      console.log(vaihtoehdot);
      const vastaukset = vaihtoehdot.map((item) => {
        return {
          id: item.id,
          kysymys_id: kysymys_id,
          oikein: item.oikein,
          teksti: item.teksti,
        };
      });
      return {
        ...kopio,
        kysymykset: [
          ...kopio.kysymykset,
          {
            id: kysymys_id,
            kysymys: kysymys,
            vastausvaihtoehdot: [...vastaukset],
          },
        ],
      };
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

module.exports = tenttiReducer;
