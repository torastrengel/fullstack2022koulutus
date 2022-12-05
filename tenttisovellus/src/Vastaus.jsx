import { useContext, useRef } from 'react';
import { TenttiContext } from './context/TenttiContext';
import axios from 'axios';
import tokenConfig from './utils/tokenConfig';

const Vastaus = ({ vastaus, kysymys_id }) => {
  const oikeaVastaus = useRef();
  const vastausvaihtoehto = useRef();
  const { dispatch } = useContext(TenttiContext);

  return (
    <div key={vastaus.id}>
      <input type="radio" value={vastaus.vastaus} name="kysymys" />{' '}
      <input
        className="vastaus-input"
        type="text"
        ref={vastausvaihtoehto}
        defaultValue={vastaus.teksti}
        onChange={async (event) => {
          try {
            await axios.put(
              `https://localhost:3001/admin/vastaukset/${vastaus.id}`,
              {
                vastaus: event.target.value,
                onkoOikein: oikeaVastaus.current.checked,
              },
              tokenConfig()
            );
            dispatch({
              type: 'VASTAUS_MUUTETTIIN',
              payload: {
                uusiVastaus: event.target.value,
                vastausId: vastaus.id,
                kysymysId: kysymys_id,
              },
            });
          } catch (error) {
            dispatch({
              type: 'VIRHE',
              payload: {
                message: 'Hups! Tapahtui virhe. Aika noloa.',
                errorMessage: error,
              },
            });
          }
        }}
      />
      <input
        type="checkbox"
        ref={oikeaVastaus}
        name="onkoOikea"
        defaultChecked={vastaus.oikein}
        onChange={async (event) => {
          try {
            console.log(oikeaVastaus.current.value);
            await axios.put(
              `https://localhost:3001/admin/vastaukset/${vastaus.id}`,
              {
                vastaus: vastausvaihtoehto.current.value,
                onkoOikein: oikeaVastaus.current.checked,
              },
              tokenConfig()
            );
            dispatch({
              type: 'OIKEELLISUUS_MUUTETTIIN',
              payload: {
                uusiOikea: event.target.checked,
                vastausId: vastaus.id,
              },
            });
          } catch (error) {
            dispatch({
              type: 'VIRHE',
              payload: {
                message: 'Hups! Tapahtui virhe. Aika noloa.',
                errorMessage: error,
              },
            });
          }
        }}
      />{' '}
      Oikea vastaus?
    </div>
  );
};

export default Vastaus;
