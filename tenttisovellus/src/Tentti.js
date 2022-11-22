import { useState, useEffect, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import './Tentti.css';

import Kysymys from './Kysymys';
import Button from '@mui/material/Button';
import UusiKysymysForm from './UusiKysymysForm';
import { TentitContext, TentitDispatchContext } from './TentitContext';

export async function loader({ params }) {
  return params.tenttiId;
}

/* Komponentti yhden tentin näyttämistä varten */

const Tentti = () => {
  const tenttiId = useLoaderData();
  const [lomakeEsilla, setLomakeEsilla] = useState(false);
  const dispatch = useContext(TentitDispatchContext);
  const tentti = useContext(TentitContext);

  const muutaLomakkeenTila = () => {
    setLomakeEsilla(!lomakeEsilla);
  };

  useEffect(() => {
    const haeTenttiById = async () => {
      try {
        const { data: uusiHaettuTentti } = await axios.get(
          `https://localhost:3001/tentit/${tenttiId}`,
          {
            headers: {
              Authorization:
                localStorage.getItem('tenttisovellus_token') &&
                `bearer ${localStorage.getItem('tenttisovellus_token')}`,
            },
          }
        );
        dispatch({
          type: 'TENTTI_HAETTU',
          payload: uusiHaettuTentti,
        });
      } catch (error) {
        console.error('Tentti.js - Virhe tentin haussa', error);
      }
    };
    haeTenttiById();
  }, [tenttiId, dispatch]);

  const kysymykset = tentti.kysymykset?.map((item) => {
    return (
      <Kysymys
        key={item.id}
        kysymys={item}
        vastaukset={item.vastausvaihtoehdot}
      />
    );
  });

  const tenttiHasData = Object.keys(tentti).length > 0;

  return (
    // <div className="tentti">
    //   {kysymykset}
    //   <Button onClick={muutaLomakkeenTila} color="secondary">
    //     {lomakeEsilla ? 'Piilota lomake' : 'Uusi kysymys'}
    //   </Button>
    //   {lomakeEsilla && (
    //     <UusiKysymysForm
    //       tenttiId={tentti.tentti.id}
    //       muutaLomakkeenTila={muutaLomakkeenTila}
    //       dispatch={dispatch}
    //     />
    //   )}
    //   <Button color="primary">Tarkista vastaukset</Button>
    // </div>
    tenttiHasData && (
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
    )
  );
};

export default Tentti;
