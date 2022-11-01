import { useState, useReducer, useEffect } from 'react';
import Tentti from './Tentti';
import SaveAlert from './SaveAlert';
import axios from 'axios';

const reducer = (state, action) => {
  const kopio = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'KYSYMYS_MUUTETTIIN': {
      const {
        kysymys: uusiKysymys,
        valittuTentti,
        index: kysymysIndex,
      } = action.payload;
      kopio.tentit[valittuTentti].kysymykset[kysymysIndex].kysymys =
        uusiKysymys;
      kopio.dataSaved = true;
      return kopio;
    }

    case 'OIKEELLISUUS_MUUTETTIIN': {
      const {
        uusiOikea,
        valittuTentti,
        tenttiIndex,
        index: vaihtoehtoIndex,
      } = action.payload;
      kopio.tentit[valittuTentti].kysymykset[tenttiIndex].vaihtoehdot[
        vaihtoehtoIndex
      ].onkoOikea = uusiOikea;
      kopio.dataSaved = true;
      return kopio;
    }

    case 'VASTAUS_MUUTETTIIN': {
      const {
        uusiVastaus,
        valittuTentti,
        tenttiIndex,
        index: vaihtoehtoIndex,
      } = action.payload;

      kopio.tentit[valittuTentti].kysymykset[tenttiIndex].vaihtoehdot[
        vaihtoehtoIndex
      ].vastaus = uusiVastaus;
      kopio.dataSaved = true;
      return kopio;
    }

    case 'KYSYMYS_LISÄTTIIN': {
      const { valittuTentti, kysymys, vastausvaihtoehdot } = action.payload;
      const newQuestion = { kysymys: kysymys, vaihtoehdot: vastausvaihtoehdot };

      kopio.tentit[valittuTentti].kysymykset.push(newQuestion);
      kopio.dataSaved = true;
      return kopio;
    }

    case 'ALUSTA_DATA':
      console.log('Data alustetaan...');
      return { tentit: action.payload, dataInitialized: true };

    case 'PÄIVITÄ_TALLENNUS':
      kopio.dataSaved = action.payload.dataSaved;
      return kopio;

    default:
      throw new Error(
        'Joko actionia ei ole määritetty tai suoritit jotain uskomatonta'
      );
  }
};

const MainContent = () => {
  const [tentteja, dispatch] = useReducer(reducer, { dataInitialized: false });
  const [valittuTentti, setValittuTentti] = useState(0);
  const [opiskelijaNakyma, setOpiskelijaNakyma] = useState(true);

  useEffect(() => {
    const haeData = async () => {
      try {
        const result = await axios.get('http://localhost:3001');
        console.log('Axios fetch: http://localhost:3001', result.data);
        dispatch({ type: 'ALUSTA_DATA', payload: result.data });
      } catch (error) {
        console.error('Virhe tapahtui:', error);
      }
    };
    haeData();
  }, []);

  //localStorageen ei tallenneta mitään äpin älyyn liittyvää dataa. Puhtaasti vain tenttiin liittyvät datat talteen - EI MUUTA!!!

  useEffect(() => {
    const tallennaDataServulle = async () => {
      try {
        await axios.post(
          'http://localhost:3001',
          tentteja.tentit[valittuTentti]
        );
      } catch (error) {
        console.error('Virhe tallennuksessa:', error);
      }
      dispatch({
        type: 'PÄIVITÄ_TALLENNUS',
        payload: {
          dataSaved: false,
          valittuTentti,
        },
      });
    };
    if (tentteja.dataSaved) {
      console.log('Tenttilista tallennetaan');
      tallennaDataServulle();
    }
  }, [tentteja.dataSaved]);

  const valitseTentti = (event) => {
    const { value: tenttinumero } = event.target;

    setValittuTentti(tenttinumero);
  };

  //Kun applikaation state tallennetaan, tallennetaanko muuttuja voi olla jo alustavasti true arvossa

  console.log('State', tentteja);
  return (
    <>
      {tentteja.dataInitialized ? (
        <div className="main-content">
          <h1>{`Tentin nimi: ${
            tentteja.tentit[valittuTentti].nimi
              ? tentteja.tentit[valittuTentti].nimi
              : 'Nimeämätön tentti'
          }`}</h1>
          <div>
            {tentteja.tentit.map((item, index) => (
              <button
                key={`Nappi ${index}`}
                value={index}
                onClick={valitseTentti}
                className="tentti-nappi"
              >
                {item.nimi || `Tentti numero ${index + 1}`}
              </button>
            ))}
          </div>
          <Tentti
            tentit={tentteja.tentit[valittuTentti]}
            valittuTentti={valittuTentti}
            dispatch={dispatch}
            opiskelijaNakyma={opiskelijaNakyma}
          />
        </div>
      ) : (
        <h1>Loading data...</h1>
      )}
    </>
  );
};

export default MainContent;
