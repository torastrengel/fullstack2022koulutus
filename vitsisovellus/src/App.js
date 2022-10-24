import './App.css';
import { useReducer, useEffect } from 'react';
import axios from 'axios';

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
      return { ...state, intervalId: '' };
    case 'VITSIÄ_NOUDETAAN':
      console.log('Vitsiä noudetaan...');
      return { ...state, haetaanVitsiä: true };
    case 'LOPETA_AUTOMAATTISET_VITSIT':
      console.log('Lopetetaan automaattiset vitsit...');
      return { ...state, automaattihaku: false };
    case 'ASETA_LATAUSAIKA_TIMEOUT':
      console.log('Simuloitu odotusaika asetettu...');
      return { ...state, timeoutId: action.payload };
    case 'POISTA_LATAUSAIKA_TIMEOUT':
      console.log('Simuloitu odotusaika lopetetaan...');
      return { ...state, timeoutId: '' };
    case 'VITSI_NOUDETTU':
      console.log('Vitsi noudettu onnistuneesti!');
      return {
        ...state,
        vitsit: [...state.vitsit, action.payload],
        haetaanVitsiä: false,
      };
    default:
      throw new Error(`Keissiä tyypillä ${action.type} ei tunnistettu`);
  }
};

function App() {
  const [vitsiData, dispatch] = useReducer(reducer, {
    vitsit: [],
    haetaanVitsiä: false,
    hakuEpäonnistui: false,
    hakuOnnistui: false,
    automaattihaku: false,
    intervalId: '',
    timeoutId: '',
  });

  useEffect(() => {
    if (vitsiData.automaattihaku && !vitsiData.intervalId) {
      const intervalId = setInterval(() => {
        if (!vitsiData.haetaanVitsiä) {
          haeVitsi();
        }
      }, 10000);

      dispatch({ type: 'ASETA_AUTOMAATIN_INTERVAL', payload: intervalId });
    } else if (vitsiData.automaattihaku && vitsiData.intervalId) {
      console.log('Automaatio on jo käynnissä!');
    } else {
      clearInterval(vitsiData.intervalId);
      dispatch({ type: 'POISTA_AUTOMAATIN_INTERVAL' });
      dispatch({ type: 'POISTA_LATAUSAIKA_TIMEOUT' });
    }
  }, [vitsiData.automaattihaku]);

  const haeVitsi = async () => {
    try {
      if (!vitsiData.haetaanVitsiä) {
        dispatch({ type: 'VITSIÄ_NOUDETAAN' });
        const result = await axios.get(
          'https://api.chucknorris.io/jokes/random'
        );

        const timeoutId = setTimeout(() => {
          dispatch({ type: 'VITSI_NOUDETTU', payload: result.data });
        }, 2000);
        dispatch({ type: 'ASETA_LATAUSAIKA_TIMEOUT', payload: timeoutId });

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
    }
  };

  const aloitaAutomaattihaku = () => {
    dispatch({ type: 'ALOITA_AUTOMAATTISET_VITSIT' });
  };

  const lopetaAutomaattihaku = () => {
    dispatch({ type: 'LOPETA_AUTOMAATTISET_VITSIT' });
  };

  let randomIndex = Math.floor(Math.random() * vitsiData.vitsit.length);

  return (
    <div className="vitsi-root">
      {vitsiData.haetaanVitsiä && (
        <div className="haetaan-notification">
          <h4>Haetaan vitsiä</h4>
        </div>
      )}

      {vitsiData.vitsit.length > 0 && (
        <h1>{vitsiData.vitsit[randomIndex].value}</h1>
      )}

      <button onClick={haeVitsi}>Hae vitsiä</button>
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
