import { useContext, useRef } from 'react';
import { TenttiContext } from './context/TenttiContext';
import { UserContext } from './context/UserContext';
import axios from 'axios';
import tokenConfig from './utils/tokenConfig';

const Vastaus = ({ vastaus, kysymys_id }) => {
  const oikeaVastaus = useRef();
  const vastausvaihtoehto = useRef();
  const { dispatch } = useContext(TenttiContext);
  const { user } = useContext(UserContext);

  const poistaVaihtoehto = async (vastausid) => {
    try {
      const { data } = await axios.delete(
        `https://localhost:3001/admin/vastaukset/${vastausid}`,
        tokenConfig()
      );
      if (data.success) {
        dispatch({
          type: 'ADMIN/POISTA_VAIHTOEHTO',
          payload: {
            vastausId: vastausid,
            kys_id: kysymys_id,
          },
        });
      }
    } catch (error) {
      console.error('Virhe vastausvaihtoehtoa poistaessa: ', error);
    }
  };

  if (!user.isAdmin) {
    return (
      <div className="vastaus-input-container">
        <input
          type="radio"
          value={vastaus.teksti}
          name="kysymys"
          id={vastaus.id}
        />
        <label htmlFor={vastaus.id}>{vastaus.teksti}</label>
      </div>
    );
  }

  return (
    <div>
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
      <span
        onClick={() => poistaVaihtoehto(vastaus.id)}
        className="vastausvaihtoehto-poisto"
      >
        🗑️
      </span>
    </div>
  );
};

export default Vastaus;
