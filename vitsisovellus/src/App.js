import './App.css';
import { useReducer, useEffect } from 'react';
import axios from 'axios';

// Dispatch keissit
const reducer = (state, action) => {
  switch (action.type) {
    case 'ALOITA_AUTOMAATTISET_VITSIT':
      console.log('Haetaan uusi vitsi 10 sekunnin välein...');
      return { ...state, automaattihaku: true };
    case 'ASETA_AUTOMAATIN_INTERVAL':
      console.log('Dispatch: Aseta intervalId');
      return { ...state, intervalId: action.payload };
    case 'POISTA_AUTOMAATIN_INTERVAL':
      console.log('Dispatch: Poista intervalId');
      clearInterval(action.payload);
      return { ...state, intervalId: null };
    case 'POISTA_AJASTIN_INTERVAL':
      console.log('Dispatch: Poista ajastinId');
      clearInterval(action.payload);
      return { ...state, ajastinId: null, ajastin: 10 };
    case 'VITSIÄ_NOUDETAAN':
      console.log('Vitsiä noudetaan...');
      return {
        ...state,
        haetaanVitsiä: true,
        hakuEpäonnistui: false,
        tallennus: true,
      };
    case 'VITSIN_HAKU_EPÄONNISTUI':
      console.log('Vitsin haku epäonnistui :/');
      return { ...state, hakuEpäonnistui: true, haetaanVitsiä: false };
    case 'LOPETA_AUTOMAATTISET_VITSIT':
      console.log('Lopetetaan automaattiset vitsit...');
      return { ...state, automaattihaku: false };
    case 'VÄHENNÄ_SEKUNTI_AJASTIMESTA':
      if (state.ajastin === 1) {
        return { ...state, ajastin: 10 };
      } else {
        return {
          ...state,
          ajastin: state.ajastin - 1,
        };
      }
    case 'VITSI_NOUDETTU':
      console.log('Vitsi noudettu onnistuneesti!');
      return {
        ...state,
        vitsit: [...state.vitsit, action.payload],
        vitsi: action.payload.value,
        haetaanVitsiä: false,
        tallennus: false,
      };
    case 'ASETA_AJASTIN_INTERVAL':
      console.log('Aseta ajastinId');
      return {
        ...state,
        ajastinId: action.payload,
      };
    case 'ALUSTA_DATA':
      console.log(action.type, 'Alustetaan data...');
      return { ...state, vitsit: [...action.payload] };
    default:
      throw new Error(`Keissiä tyypillä ${action.type} ei tunnistettu`);
  }
};

function App() {
  //Alustava data sekä state
  const [vitsiData, dispatch] = useReducer(reducer, {
    vitsit: [],
    nähdytVitsit: [],
    vitsi: '',
    haetaanVitsiä: false,
    hakuEpäonnistui: false,
    hakuOnnistui: false,
    automaattihaku: false,
    intervalId: null,
    ajastin: 10,
    ajastinId: null,
    tallennus: false,
  });

  console.log(vitsiData.ajastinId);

  //Haetaan data localStoragesta tai viedään se sinne, mikäli sitä ei jo ole olemassa
  useEffect(() => {
    const vitsit = localStorage.getItem('vitsit');

    if (vitsit) {
      console.log(
        'Data löytyi localStoragesta! Alustetaan sovellus localStoragen datalla'
      );
      dispatch({ type: 'ALUSTA_DATA', payload: JSON.parse(vitsit) });
    } else {
      console.log(
        'Chuck Norris on siivonnut localStoragen. Pistetääs data takaisin!'
      );
      localStorage.setItem('vitsit', JSON.stringify(vitsiData.vitsit));
      dispatch({ type: 'ALUSTA_DATA', payload: vitsiData.vitsit });
    }
  }, []);

  // useEffect automaattisen vitsin toteutukseen. Suoritetaan aina, kun automaattihaku boolean muuttuu
  useEffect(() => {
    if (vitsiData.automaattihaku) {
      const intervalId = setInterval(() => {
        if (!vitsiData.haetaanVitsiä) {
          haeVitsi();
        }
      }, 10000);
      const ajastinId = setInterval(() => {
        dispatch({
          type: 'VÄHENNÄ_SEKUNTI_AJASTIMESTA',
        });
      }, 1000);

      dispatch({ type: 'ASETA_AJASTIN_INTERVAL', payload: ajastinId });
      dispatch({ type: 'ASETA_AUTOMAATIN_INTERVAL', payload: intervalId });
    } else {
      dispatch({
        type: 'POISTA_AUTOMAATIN_INTERVAL',
        payload: vitsiData.intervalId,
      });
      dispatch({
        type: 'POISTA_AJASTIN_INTERVAL',
        payload: vitsiData.ajastinId,
      });
    }
  }, [vitsiData.automaattihaku]);

  //useEffect, jonka vastuulla on tallentaa data aina localStorageen, mikäli vitsit listaan lisätään uusia vitsejä
  useEffect(() => {
    if (vitsiData.tallennus) {
      console.log('Chuck Norris kantoi datan localStorageen -->');
      localStorage.setItem('vitsit', JSON.stringify(vitsiData.vitsit));
    }
  }, [vitsiData.tallennus]);

  const haeVitsi = async () => {
    try {
      if (!vitsiData.haetaanVitsiä) {
        dispatch({ type: 'VITSIÄ_NOUDETAAN' });
        const result = await axios.get(
          'https://api.chucknorris.io/jokes/random'
        );

        dispatch({ type: 'VITSI_NOUDETTU', payload: result.data });

        /*
        Haetun objektin rakenne - result.data
          {
            "categories": [],
            "created_at": "2020-01-05 13:42:21.455187",
            "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
            "id": "EBENfBjKRjmLkXKIEsSXRQ",
            "updated_at": "2020-01-05 13:42:21.455187",
            "url": "https://api.chucknorris.io/jokes/EBENfBjKRjmLkXKIEsSXRQ",
            "value": "If looks could kill, Chuck Norris would be considered the biggest genocidal maniac since Hitler."
          }
        */
      }
    } catch (error) {
      console.log('Tapahtui virhe:', error);
      dispatch({ type: 'VITSIN_HAKU_EPÄONNISTUI' });
    }
  };

  const aloitaAutomaattihaku = () => {
    dispatch({ type: 'ALOITA_AUTOMAATTISET_VITSIT' });
  };

  const lopetaAutomaattihaku = () => {
    dispatch({ type: 'LOPETA_AUTOMAATTISET_VITSIT' });
  };

  return (
    <div className="vitsi-root">
      {vitsiData.automaattihaku && (
        <span>{`Chuck Norris hakee seuraavan vitsin ${vitsiData.ajastin} sekunnin kuluttua`}</span>
      )}
      {vitsiData.haetaanVitsiä && (
        <div className="haetaan-notification">
          <h4>Haetaan vitsiä</h4>
        </div>
      )}

      {vitsiData.hakuEpäonnistui && (
        <div className="haetaan-notification">
          <h4>Vitsin haussa tapahtui virhe. Tee uusi haku alta:</h4>
          <button onClick={haeVitsi}>Uusi haku</button>
        </div>
      )}

      {vitsiData.vitsi && <h1 className="vitsi">{vitsiData.vitsi}</h1>}

      <button disabled={vitsiData.haetaanVitsiä} onClick={haeVitsi}>
        Hae vitsiä
      </button>
      {vitsiData.automaattihaku ? (
        <button onClick={lopetaAutomaattihaku}>
          Lopeta automaattinen haku
        </button>
      ) : (
        <button onClick={aloitaAutomaattihaku}>
          Aloita automaattinen haku
        </button>
      )}
    </div>
  );
}

export default App;
