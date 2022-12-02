import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Tentti.css';

import Kysymys from './Kysymys';
import Button from '@mui/material/Button';
import UusiKysymysForm from './UusiKysymysForm';
import { TenttiContext } from './context/TenttiContext';
import { useAxios } from './hooks/useAxios';

const tokenConfig = require('./utils/tokenConfig');

/* Komponentti yhden tentin näyttämistä varten */

const Tentti = () => {
  const { id: tenttiId } = useParams();
  const [lomakeEsilla, setLomakeEsilla] = useState(false);
  const { dispatch, tentti } = useContext(TenttiContext);
  const {
    data: uusiHaettuTentti,
    loading,
    error,
  } = useAxios({
    method: 'GET',
    url: `/tentit/${tenttiId}`,
    ...tokenConfig(),
  });

  console.log('Yksi tentti', tentti);

  useEffect(() => {
    dispatch({
      type: 'TENTTI_HAETTU',
      payload: uusiHaettuTentti,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uusiHaettuTentti]);

  if (loading) {
    return <h1>Fetching data from a database, hold your horses...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  const muutaLomakkeenTila = () => {
    setLomakeEsilla(!lomakeEsilla);
  };

  const kysymykset = tentti.kysymykset?.map((item) => {
    return (
      <Kysymys
        key={item.id}
        kysymys={item}
        vastaukset={item.vastausvaihtoehdot}
      />
    );
  });

  return (
    <div className="tentti">
      <h1>{tentti.tentti?.nimi}</h1>
      {kysymykset}
      <Button onClick={muutaLomakkeenTila} color="secondary">
        {lomakeEsilla ? 'Piilota lomake' : 'Uusi kysymys'}
      </Button>
      {lomakeEsilla && (
        <UusiKysymysForm
          tenttiId={tentti.tentti?.id}
          muutaLomakkeenTila={muutaLomakkeenTila}
        />
      )}
    </div>
  );
};

export default Tentti;
