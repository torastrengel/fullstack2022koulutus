import { useReducer, useEffect } from 'react';
import Tentti from './Tentti';
import axios from 'axios';

const MainContent = () => {
  useEffect(() => {
    const haeData = async () => {
      try {
        const result = await axios.get('https://localhost:3001/tentit');
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
        await axios.post('https://localhost:3001');
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
        `https://localhost:3001/tentit/${tenttiId}`
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
  const vaihtonapit =
    tentteja.length > 0 &&
    tentteja.map((item, index) => (
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
      {tentteja ? (
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
