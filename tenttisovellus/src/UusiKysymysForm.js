import { Button } from '@mui/material';
import { useRef, useState, useContext } from 'react';
import VaihtoehtoKentta from './VaihtoehtoKentta';
import axios from 'axios';
import { TentitDispatchContext, TentitContext } from './TentitContext';
import tokenConfig from './utils/tokenConfig';

const UusiKysymysForm = ({ muutaLomakkeenTila }) => {
  const kysymysRef = useRef(null);
  const pisteRef = useRef(null);
  const [vaihtoehdot, setVaihtoehdot] = useState([]);
  const dispatch = useContext(TentitDispatchContext);
  const tentit = useContext(TentitContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let kysymys_id = '';

    if (!kysymysRef || vaihtoehdot.length === 0) {
      alert(
        'Kysymys ei saa olla tyhjä ja vastausvaihtoehtoja pitää olla enemmän kuin nolla!'
      );
      return;
    }

    try {
      const { data: kysymysData } = await axios.post(
        'https://localhost:3001/admin/kysymykset',
        {
          kysymys: kysymysRef.current.value,
          pisteet: pisteRef.current.value,
          tentti_id: tentit.tentti.id,
        },
        tokenConfig()
      );
      kysymys_id = kysymysData.kysymys_id;
    } catch (error) {
      console.error('Virhe lähettäessä kysymystä DB:hen', error);
    } finally {
      // const result = await axios.get(
      //   `https://localhost:3001/tentit/${tentit.tentti.id}`,
      //   tokenConfig()
      // );
      dispatch({
        type: 'KYSYMYS_LISÄTTIIN',
        payload: {
          // tenttiData: result.data,
          vaihtoehdot: vaihtoehdot,
          kysymys_id: kysymys_id,
        },
      });
    }

    // dispatch({
    //   type: 'KYSYMYS_LISÄTTIIN',
    //   payload: {
    //     kysymys: kysymys,
    //     vastausvaihtoehdot: vaihtoehdot,
    //     tenttiId: tenttiId,
    //     pisteet: pisteet,
    //   },
    // });
    setVaihtoehdot([]);
    (() => muutaLomakkeenTila())();
  };

  const uusiVaihtoehtoKentta = (e) => {
    const uusiKentta = {
      id: vaihtoehdot.length + 1,
      teksti: '',
      oikein: false,
    };

    setVaihtoehdot([...vaihtoehdot, uusiKentta]);
  };

  const poistaVaihtoehto = (e, id) => {
    setVaihtoehdot(vaihtoehdot.filter((item) => item.id !== id));
  };

  const muutaVaihtoehtoKenttaa = (e, id) => {
    const { value, name, type } = e.target;
    const vaihtoehdotKopio = JSON.parse(JSON.stringify(vaihtoehdot));

    if (type === 'checkbox') {
      const muuttuneetArvot = vaihtoehdotKopio.map((item) => {
        if (item.id === id) {
          return { ...item, [name]: !item.onkoOikea };
        }
        return { ...item };
      });
      setVaihtoehdot(muuttuneetArvot);
    } else {
      const muuttuneetArvot = vaihtoehdotKopio.map((item) => {
        if (item.id === id) {
          return { ...item, [name]: value };
        }
        return { ...item };
      });
      setVaihtoehdot(muuttuneetArvot);
    }
  };

  return (
    <form className="uusi-kysymys-form" onSubmit={handleSubmit}>
      <input
        ref={kysymysRef}
        className="uusi-kysymys-input"
        type="text"
        name="kysymys"
        placeholder="Kysymys tähän"
      />
      <input
        ref={pisteRef}
        type="number"
        name="pisteet"
        placeholder="Kysymyksen pistemäärä"
      />
      {vaihtoehdot.map((item, index) => {
        return (
          <VaihtoehtoKentta
            key={index}
            index={index}
            id={item.id}
            muutaVaihtoehtoKenttaa={muutaVaihtoehtoKenttaa}
            vastaus={item.vastaus}
            onkoOikea={item.onkoOikea}
            poistaVaihtoehto={poistaVaihtoehto}
          />
        );
      })}
      <span className="lisaa-kysymys-nappi" onClick={uusiVaihtoehtoKentta}>
        Lisää vastausvaihtoehto
      </span>
      <Button type="submit">Lisää kysymys nykyiseen tenttiin</Button>
    </form>
  );
};

export default UusiKysymysForm;
