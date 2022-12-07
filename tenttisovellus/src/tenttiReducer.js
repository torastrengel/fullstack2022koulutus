/* Reducer keissit - TENTIT */
const tenttiReducer = (tentit, action) => {
  const kopio = JSON.parse(JSON.stringify(tentit));
  console.log('tenttiReducer', action.type);
  switch (action.type) {
    case 'ADMIN/TENTIT_HAETTU': {
      return { ...kopio, tenttilista: action.payload };
    }

    case 'ADMIN/POISTA_TENTTI': {
      const uudetTentit = kopio.tenttilista.filter(
        (item) => item.id !== action.payload
      );
      return { ...kopio, tenttilista: uudetTentit };
    }

    case 'ADMIN/POISTA_VAIHTOEHTO': {
      const { vastausId, kys_id } = action.payload;

      const uusiKysymyslista = tentit.haettuTentti.kysymykset.map((kysymys) => {
        if (kysymys.id === kys_id) {
          return {
            ...kysymys,
            vastausvaihtoehdot: kysymys.vastausvaihtoehdot.filter(
              (vastaus) => vastaus.id !== vastausId
            ),
          };
        } else {
          return kysymys;
        }
      });

      return {
        ...tentit,
        haettuTentti: { ...tentit.haettuTentti, kysymykset: uusiKysymyslista },
      };
    }

    case 'ADMIN/POISTA_KYSYMYS': {
      const uusiKysymyslista = kopio.haettuTentti.kysymykset.filter(
        (item) => item.id !== action.payload.kys_id
      );
      return {
        ...kopio,
        haettuTentti: {
          ...kopio.valittuTentti,
          kysymykset: uusiKysymyslista,
        },
      };
    }

    case 'ADMIN/LISÄÄ_VASTAUSVAIHTOEHTO': {
      const { kys_id, vastaus_id } = action.payload;
      const uudetVaihtoehdot = kopio.haettuTentti.kysymykset.map((item) => {
        if (item.id === kys_id) {
          return {
            ...item,
            vastausvaihtoehdot: [
              ...item.vastausvaihtoehdot,
              { id: vastaus_id, kysymys_id: kys_id, oikein: false, teksti: '' },
            ],
          };
        } else {
          return item;
        }
      });

      return {
        ...kopio,
        haettuTentti: { ...kopio.haettuTentti, kysymykset: uudetVaihtoehdot },
      };
    }

    case 'HAE_KAIKKI_TENTIT': {
      return { ...kopio, tenttilista: action.payload.tentit };
    }

    case 'KYSYMYS_MUUTETTIIN': {
      const { kysymys: uusiKysymys, kysymysId } = action.payload;
      const uudetKysymykset = kopio.valittuTentti.kysymykset.map((item) => {
        if (item.id === kysymysId) {
          return { ...item, kysymys: uusiKysymys };
        } else {
          return item;
        }
      });

      return {
        ...kopio,
        valittuTentti: { ...kopio.valittuTentti, kysymykset: uudetKysymykset },
      };
    }

    case 'TENTTI_HAETTU': {
      return { ...kopio, haettuTentti: { ...action.payload.valittuTentti } };
    }

    case 'OIKEELLISUUS_MUUTETTIIN': {
      const { uusiOikea, vastausId } = action.payload;
      const uudetVastaukset = kopio.haettuTentti.kysymykset.map((kysymys) => {
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

      return {
        ...kopio,
        haettuTentti: { ...kopio.haettuTentti, kysymykset: uudetVastaukset },
      };
    }

    case 'VASTAUS_MUUTETTIIN': {
      const { uusiVastaus, vastausId, kysymysId } = action.payload;

      const muokattuKysymyslista = kopio.haettuTentti.kysymykset.map(
        (kysymys) => {
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
        }
      );

      return {
        ...kopio,
        haettuTentti: {
          ...kopio.haettuTentti,
          kysymykset: muokattuKysymyslista,
        },
      };
    }

    case 'VIRHE': {
      return { ...kopio, ...action.payload };
    }

    case 'KYSYMYS_LISÄTTIIN': {
      const { kysymys_id, kysymys, vaihtoehdot } = action.payload;
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
        valittuTentti: {
          ...kopio.valittuTentti,
          kysymykset: [
            ...kopio.valittuTentti.kysymykset,
            {
              id: kysymys_id,
              kysymys: kysymys,
              vastausvaihtoehdot: [...vastaukset],
            },
          ],
        },
      };
    }

    default:
      throw new Error(
        'Joko actionia ei ole määritetty tai suoritit jotain uskomatonta'
      );
  }
};

module.exports = tenttiReducer;
