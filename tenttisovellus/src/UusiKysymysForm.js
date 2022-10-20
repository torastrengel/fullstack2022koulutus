import { Button } from '@mui/material';
import { useState } from 'react';
import VaihtoehtoKentta from './VaihtoehtoKentta';

const UusiKysymysForm = ({ dispatch, valittuTentti, muutaLomakkeenTila }) => {
  const [kysymys, setKysymys] = useState('');
  const [vaihtoehdot, setVaihtoehdot] = useState([]);

  const muutaKysymys = (e) => {
    const { value } = e.target;

    setKysymys(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!kysymys || vaihtoehdot.length === 0) {
      alert(
        'Kysymys ei saa olla tyhjä ja vastausvaihtoehtoja pitää olla enemmän kuin nolla!'
      );
      return;
    }

    dispatch({
      type: 'KYSYMYS_LISÄTTIIN',
      payload: {
        kysymys: kysymys,
        vastausvaihtoehdot: vaihtoehdot,
        valittuTentti: valittuTentti,
      },
    });
    setVaihtoehdot([]);
    setKysymys('');
    (() => muutaLomakkeenTila())();
  };

  const uusiVaihtoehtoKentta = (e) => {
    const uusiKentta = {
      id: vaihtoehdot.length + 1,
      vastaus: '',
      onkoOikea: false,
    };

    setVaihtoehdot([...vaihtoehdot, uusiKentta]);
  };

  const muutaVaihtoehtoKenttaa = (e, id) => {
    const { value, name, type } = e.target;
    const vaihtoehdotKopio = JSON.parse(JSON.stringify(vaihtoehdot));

    if (type === 'checkbox') {
      const muuttuneetArvot = vaihtoehdotKopio.map((item, index) => {
        if (item.id === id) {
          console.log('ID täsmää', item);
          return { ...item, [name]: !item.onkoOikea };
        }
        console.log('ID ei täsmää', item);
        return { ...item };
      });
      setVaihtoehdot(muuttuneetArvot);
    } else {
      const muuttuneetArvot = vaihtoehdotKopio.map((item, index) => {
        if (item.id === id) {
          return { ...item, [name]: value };
        }
        console.log('got here');
        return { ...item };
      });
      setVaihtoehdot(muuttuneetArvot);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={kysymys}
        name="kysymys"
        onChange={muutaKysymys}
        placeholder="Kysymys tähän"
      />
      {vaihtoehdot.map((item, index) => {
        return (
          // <div key={index}>
          <VaihtoehtoKentta
            key={index}
            index={index}
            id={item.id}
            muutaVaihtoehtoKenttaa={muutaVaihtoehtoKenttaa}
            vastaus={item.vastaus}
            onkoOikea={item.onkoOikea}
          />
          //   {`Vaihtoehto ${index + 1}`}
          //   <input
          //     type="text"
          //     placeholder="vaihtoehto"
          //     name={`vastaus_${index + 1}`}
          //     value={item.vastaus}
          //     onChange={muutaVaihtoehtoKenttaa}
          //   />
          //   <input
          //     type="checkbox"
          //     name="onkoOikea"
          //     checked={item.onkoOikea}
          //     onChange={muutaVaihtoehtoKenttaa}
          //   />
          // </div>
        );
      })}
      <span onClick={uusiVaihtoehtoKentta}>Lisää vastausvaihtoehto</span>
      <Button type="submit">Lisää kysymys nykyiseen tenttiin</Button>
    </form>
  );
};

export default UusiKysymysForm;
