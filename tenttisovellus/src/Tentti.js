import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Tentti.css';

import haeTentti from './utils/haeTentti';

import Kysymys from './Kysymys';
import Button from '@mui/material/Button';
import UusiKysymysForm from './UusiKysymysForm';
import { TenttiContext } from './context/TenttiContext';

/* Komponentti yhden tentin näyttämistä varten */

const Tentti = () => {
  const { id: tenttiId } = useParams();
  const [lomakeEsilla, setLomakeEsilla] = useState(false);
  const { dispatch, tentti } = useContext(TenttiContext);

  console.count('Tentti.js on ladannut: ');

  useEffect(() => {
    const haeData = async () => {
      try {
        const data = await haeTentti(tenttiId);
        if (data.success) {
          dispatch({
            type: 'TENTTI_HAETTU',
            payload: {
              valittuTentti: data,
            },
          });
        }
      } catch (error) {
        console.error('Tentin haussa ongelmia: ', error);
      }
    };
    haeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenttiId]);

  // const { data, loading, error } = useAxios({
  //   method: 'GET',
  //   url: `/tentit/${tenttiId}`,
  //   ...tokenConfig(),
  // });

  // useEffect(() => {
  //   if (!dataHaettu) {
  //     setDataHaettu(true);
  //     dispatch({
  //       type: 'TENTTI_HAETTU',
  //       payload: {
  //         valittuTentti: { ...data.tentti },
  //       },
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const muutaLomakkeenTila = () => {
    setLomakeEsilla(!lomakeEsilla);
  };

  console.log(tentti);

  const kysymykset = tentti.haettuTentti.kysymykset?.map((item) => {
    return (
      <Kysymys
        key={item.id}
        id={item.id}
        kysymys={item}
        vastaukset={item.vastausvaihtoehdot}
      />
    );
  });

  return (
    <div className="tentti">
      <h1>{tentti.haettuTentti.tentti?.nimi}</h1>
      {kysymykset}
      <Button onClick={muutaLomakkeenTila} color="secondary">
        {lomakeEsilla ? 'Piilota lomake' : 'Uusi kysymys'}
      </Button>
      {lomakeEsilla && (
        <UusiKysymysForm
          tenttiId={tentti.haettuTentti?.tentti.id}
          muutaLomakkeenTila={muutaLomakkeenTila}
        />
      )}
    </div>
  );
};

export default Tentti;
