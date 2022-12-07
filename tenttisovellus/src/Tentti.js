import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Tentti.css';

import haeTentti from './utils/haeTentti';

import Kysymys from './Kysymys';
import Button from '@mui/material/Button';
import UusiKysymysForm from './UusiKysymysForm';
import { TenttiContext } from './context/TenttiContext';
import { UserContext } from './context/UserContext';
import axios from 'axios';
import tokenConfig from './utils/tokenConfig';

/* Komponentti yhden tentin näyttämistä varten */

const Tentti = () => {
  const { id: tenttiId } = useParams();
  const [lomakeEsilla, setLomakeEsilla] = useState(false);
  const [tenttiAloitettu, setTenttiAloitettu] = useState(false);
  const { dispatch, tentti } = useContext(TenttiContext);
  const { user } = useContext(UserContext);

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

  const palautaTentti = (e) => {
    console.log(e);
  };

  const aloitaTentti = async () => {
    const uusiSuoritus = {
      kayttaja_id: user.userId,
    };

    try {
      const { data } = await axios.post(
        `https://localhost:3001/tentit/${tenttiId}/suoritus`,
        uusiSuoritus,
        tokenConfig()
      );
      if (data.success) {
        setTenttiAloitettu(true);
      }
    } catch (error) {
      console.error('Virhe suorituksen merkinnässä: ', error);
    }
  };

  const kysymykset = tentti.haettuTentti.kysymykset?.map((item, index) => {
    return (
      <Kysymys
        key={item.id}
        index={index}
        id={item.id}
        kysymys={item}
        vastaukset={item.vastausvaihtoehdot}
      />
    );
  });

  if (!user.isAdmin) {
    return tenttiAloitettu ? (
      <div className="tentti">
        <h1>{tentti.haettuTentti.tentti?.nimi}</h1>
        {kysymykset}
        <button onClick={palautaTentti} className="tentin-palautusnappi">
          Palauta tentti
        </button>
      </div>
    ) : (
      <div>
        <h2>
          Olet aloittamassa tentin. Paina alla olevaa nappia aloittaaksesi
          tentin
        </h2>
        <button onClick={aloitaTentti}>Aloita tentti</button>
      </div>
    );
  }

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
