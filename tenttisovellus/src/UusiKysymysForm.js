import { Button } from '@mui/material';
import { useState } from 'react';
import VaihtoehtoKentta from './VaihtoehtoKentta';
import axios from 'axios';

const UusiKysymysForm = ({ dispatch, muutaLomakkeenTila, tenttiId }) => {
  const [kysymys, setKysymys] = useState('');
  const [pisteet, setPisteet] = useState(0);
  const [vaihtoehdot, setVaihtoehdot] = useState([]);

  const muutaKysymys = (e) => {
    const { value } = e.target;

    setKysymys(value);
  };

  const muutaPisteet = (e) => {
    const { value } = e.target;

    setPisteet(+value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!kysymys || vaihtoehdot.length === 0) {
      alert(
        'Kysymys ei saa olla tyhjä ja vastausvaihtoehtoja pitää olla enemmän kuin nolla!'
      );
      return;
    }

    try {
      await axios.post('http://localhost:3001/kysymykset', {
        kysymys: kysymys,
        pisteet: pisteet,
        tentti_id: tenttiId,
      });
    } catch (error) {
      console.error('Virhe lähettäessä kysymystä DB:hen', error);
    } finally {
      const result = await axios.get(
        `http://localhost:3001/tentit/${tenttiId}`
      );
      dispatch({
        type: 'KYSYMYS_LISÄTTIIN',
        payload: result.data,
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
    setKysymys('');
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
        className="uusi-kysymys-input"
        type="text"
        value={kysymys}
        name="kysymys"
        onChange={muutaKysymys}
        placeholder="Kysymys tähän"
      />
      <input
        type="number"
        name="pisteet"
        value={pisteet}
        onChange={muutaPisteet}
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
