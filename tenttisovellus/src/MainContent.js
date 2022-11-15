import { useReducer, useEffect } from 'react';
import Tentti from './Tentti';
import SaveAlert from './SaveAlert';
import axios from 'axios';

// Tästä alkaa reducer keissit
const reducer = (state, action) => {
  const kopio = JSON.parse(JSON.stringify(state));
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
      const { uusiVastaus, vastausId } = action.payload;
      const uudetVastaukset = kopio.vastaukset.map((item) => {
        if (item.id === vastausId) {
          return { ...item, teksti: uusiVastaus };
        } else {
          return item;
        }
      });

      return { ...kopio, vastaukset: uudetVastaukset };
    }

    case 'KYSYMYS_LISÄTTIIN': {
      return { ...action.payload, dataInitialized: true };
    }

    case 'ALUSTA_DATA':
      console.log('Data alustetaan...');
      return { tentit: action.payload, dataInitialized: true };

    case 'VAIHDA_TENTTI':
      console.log('Tentti vaihdettu');
      return { ...action.payload, dataInitialized: true };

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

  useEffect(() => {
    const haeData = async () => {
      try {
        const result = await axios.get('http://localhost:3001/tentit');
        console.log('Axios fetch: http://localhost:3001/tentit', result.data);
        dispatch({ type: 'ALUSTA_DATA', payload: result.data });
      } catch (error) {
        console.error('Virhe datan alustamisessa:', error);
      }
    };
    haeData();
  }, []);

  //localStorageen ei tallenneta mitään äpin älyyn liittyvää dataa. Puhtaasti vain tenttiin liittyvät datat talteen - EI MUUTA!!!

  useEffect(() => {
    const tallennaDataServulle = async () => {
      try {
        await axios.post('http://localhost:3001');
      } catch (error) {
        console.error('Virhe tallennuksessa:', error);
      }
      dispatch({
        type: 'PÄIVITÄ_TALLENNUS',
        payload: {
          dataSaved: false,
        },
      });
    };
    if (tentteja.dataSaved) {
      console.log('Tenttilista tallennetaan');
      tallennaDataServulle();
    }
  }, [tentteja.dataSaved]);

  //Kun applikaation state tallennetaan, tallennetaanko muuttuja voi olla jo alustavasti true arvossa

  const vaihdatentti = async (event) => {
    const { value: tenttiId } = event.target;

    try {
      const result = await axios.get(
        `http://localhost:3001/tentit/${tenttiId}`
      );
      dispatch({
        type: 'VAIHDA_TENTTI',
        payload: result.data,
      });
    } catch (error) {
      console.error('Virhe tentin vaihtamisessa:', error);
    }
  };

  // Tentin vaihtonapit
  const vaihtonapit = tentteja.tentit?.map((item, index) => (
    <button
      key={index}
      className="tentti-nappi"
      onClick={vaihdatentti}
      value={item.id}
    >
      {item.nimi}
    </button>
  ));

  return (
    <>
      {vaihtonapit}
      {tentteja.dataInitialized ? (
        <div className="main-content">
          <h1>{`Tentin nimi: ${tentteja.tentti?.nimi}`}</h1>
          <Tentti tentti={tentteja} dispatch={dispatch} />
        </div>
      ) : (
        <h1>Loading data...</h1>
      )}
    </>
  );
};

export default MainContent;
