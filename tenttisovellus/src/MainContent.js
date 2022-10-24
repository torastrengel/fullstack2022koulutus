import { useState, useReducer, useEffect } from 'react';
import Tentti from './Tentti';
import SaveAlert from './SaveAlert';
import { tentit } from './tentit';

const reducer = (state, action) => {
  const kopio = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'KYSYMYS_MUUTETTIIN':
      const { kysymys } = action.payload;
      kopio[action.payload.valittuTentti].tentti[action.payload.index].kysymys =
        kysymys;
      kopio[action.payload.valittuTentti].tallennetaanko = true;
      return kopio;
    case 'OIKEELLISUUS_MUUTETTIIN':
      const { uusiOikea } = action.payload;
      kopio[action.payload.valittuTentti].tentti[
        action.payload.tenttiIndex
      ].vaihtoehdot[action.payload.index].onkoOikea = uusiOikea;
      kopio[action.payload.valittuTentti].tallennetaanko = true;
      return kopio;
    case 'VASTAUS_MUUTETTIIN':
      const { uusiVastaus } = action.payload;
      kopio[action.payload.valittuTentti].tentti[
        action.payload.tenttiIndex
      ].vaihtoehdot[action.payload.index].vastaus = uusiVastaus;
      kopio[action.payload.valittuTentti].tallennetaanko = true;
      return kopio;
    case 'KYSYMYS_LISÄTTIIN':
      kopio[action.payload.valittuTentti].tallennetaanko = true;
      kopio[action.payload.valittuTentti].tentti.push({
        kysymys: action.payload.kysymys,
        vaihtoehdot: action.payload.vastausvaihtoehdot,
      });
      return kopio;
    case 'ALUSTA_DATA':
      return action.payload;
    case 'PÄIVITÄ_TALLENNUS':
      kopio[action.payload.valittuTentti].tallennetaanko =
        action.payload.tallennetaanko;
      return kopio;
    case 'TALLENNETAAN':
      kopio[action.payload.valittuTentti].dataSaved = action.payload.dataSaved;
      return kopio;
    default:
      throw new Error(
        'Joko actionia ei ole määritetty tai suoritit jotain uskomatonta'
      );
  }
};

const MainContent = () => {
  const [tentteja, dispatch] = useReducer(reducer, tentit);
  const [valittuTentti, setValittuTentti] = useState(0);
  const [opiskelijaNakyma, setOpiskelijaNakyma] = useState(true);
  const [timerId, setTimerId] = useState('');

  useEffect(() => {
    const tenttiData = localStorage.getItem('tenttidata');
    if (tenttiData == null) {
      console.log('Data tulee muuttujasta');
      localStorage.setItem('tenttidata', JSON.stringify(tentit));
      dispatch({ type: 'ALUSTA_DATA', payload: tentit });
    } else {
      console.log('Kappas! localStoragessahan oli muutakin kun valoa...');

      dispatch({ type: 'ALUSTA_DATA', payload: JSON.parse(tenttiData) });
    }
  }, []);

  //localStorageen ei tallenneta mitään äpin älyyn liittyvää dataa. Puhtaasti vain tenttiin liittyvät datat talteen - EI MUUTA!!!

  useEffect(() => {
    console.log(tentteja[valittuTentti].tallennetaanko);
    if (tentteja[valittuTentti].tallennetaanko && !timerId) {
      console.log('Tenttilista muuttui');
      if (tentteja[valittuTentti].dataSaved === false) {
        dispatch({
          type: 'TALLENNETAAN',
          payload: { valittuTentti: valittuTentti, dataSaved: true },
        });
        const timeoutId = setTimeout(() => {
          localStorage.setItem('tenttidata', JSON.stringify(tentteja));
          dispatch({
            type: 'PÄIVITÄ_TALLENNUS',
            payload: {
              tallennetaanko: false,
              valittuTentti: valittuTentti,
            },
          });
          dispatch({
            type: 'TALLENNETAAN',
            payload: { valittuTentti: valittuTentti, dataSaved: false },
          });
          setTimerId('');
          clearTimeout(timeoutId);
        }, 5000);
        setTimerId(timeoutId);
      }
    }
  }, [tentteja[valittuTentti].tallennetaanko]);

  const valitseTentti = (event) => {
    const { value: tenttinumero } = event.target;

    setValittuTentti(tenttinumero);
  };

  //Kun applikaation state tallennetaan, tallennetaanko muuttuja voi olla jo alustavasti true arvossa

  return (
    <div className="main-content">
      <h1>{`Tentin nimi: ${
        tentteja[valittuTentti].nimi
          ? tentteja[valittuTentti].nimi
          : 'Nimeämätön tentti'
      }`}</h1>
      <div>
        {tentteja.map((item, index) => (
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
      {!timerId && <SaveAlert />}
      <Tentti
        tentteja={tentteja[valittuTentti]}
        valittuTentti={valittuTentti}
        dispatch={dispatch}
        opiskelijaNakyma={opiskelijaNakyma}
      />
    </div>
  );
};

export default MainContent;
