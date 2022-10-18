import { useState, useReducer } from 'react';
import Tentti from './Tentti';
import { tentit } from './tentit';

const reducer = (state, action) => {
  switch (action.type) {
    case 'KYSYMYS_MUUTETTIIN':
      const kopio = [...state];
      const { valittuTentti, index, kysymys } = action.payload;
      kopio[valittuTentti].tentti[index].kysymys = kysymys;
      return kopio;
    case 'OIKEELLISUUS_MUUTETTIIN':
      const kopio3 = [...state];
      const {
        valittuTentti: valittuTentti3,
        index: index3,
        tenttiIndex: tenttiIndex2,
        uusiOikea,
      } = action.payload;
      console.log(uusiOikea);
      kopio3[valittuTentti3].tentti[tenttiIndex2].vaihtoehdot[
        index3
      ].onkoOikea = uusiOikea;
      return kopio3;
    case 'VASTAUS_MUUTETTIIN':
      const kopio2 = [...state];
      const {
        valittuTentti: valittuTentti2,
        index: index2,
        tenttiIndex,
        uusiVastaus,
      } = action.payload;
      kopio2[valittuTentti2].tentti[tenttiIndex].vaihtoehdot[index2].vastaus =
        uusiVastaus;
      return kopio2;
    default:
      throw new Error(
        'Joko actionia ei ole määritetty tai suoritit jotain uskomatonta'
      );
  }
};

const MainContent = () => {
  const [tentteja, dispatch] = useReducer(reducer, tentit);
  const [valittuTentti, setValittuTentti] = useState(0);

  console.log('tentteja', tentteja);

  const valitseTentti = (event) => {
    const { value: tenttinumero } = event.target;

    setValittuTentti(tenttinumero);
  };

  return (
    <div className="main-content">
      <h1>{`Tentin nimi: ${tentteja[valittuTentti].nimi}`}</h1>
      <div>
        {tentteja.map((item, index) => (
          <button
            key={`Nappi ${index}`}
            value={index}
            onClick={valitseTentti}
            className="tentti-nappi"
          >
            {item.nimi}
          </button>
        ))}
      </div>
      <Tentti
        tentteja={tentteja[valittuTentti]}
        valittuTentti={valittuTentti}
        dispatch={dispatch}
      />
    </div>
  );
};

export default MainContent;
