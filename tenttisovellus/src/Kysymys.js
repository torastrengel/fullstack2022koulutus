import { useContext, useRef } from 'react';
import { TenttiContext } from './context/TenttiContext';
import axios from 'axios';

const tokenConfig = require('./utils/tokenConfig');

const Kysymys = ({ kysymys, vastaukset }) => {
  const { dispatch } = useContext(TenttiContext);
  const oikeaVastaus = useRef();
  const vastausvaihtoehdot = vastaukset.map((item) => {
    return (
      <div key={item.id}>
        <input type="radio" value={item.vastaus} name="kysymys" />{' '}
        <input
          className="vastaus-input"
          type="text"
          defaultValue={item.teksti}
          onChange={async (event) => {
            try {
              await axios.put(
                `https://localhost:3001/admin/vastaukset/${item.id}`,
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
                  vastausId: item.id,
                  kysymysId: kysymys.id,
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
          onChange={async (event) => {
            dispatch({
              type: 'OIKEELLISUUS_MUUTETTIIN',
              payload: {
                uusiOikea: event.target.checked,
                vastausId: item.id,
              },
            });
          }}
          type="checkbox"
          ref={oikeaVastaus}
          name="onkoOikea"
          defaultChecked={item.oikein}
        />{' '}
        Oikea vastaus?
      </div>
    );
  });

  return (
    <div className="kysymys">
      <h3>{kysymys.kysymys}</h3>
      <input
        className="kysymys-input"
        type="text"
        defaultValue={kysymys.kysymys}
        onChange={async (event) => {
          try {
            await axios.put(
              `https://localhost:3001/admin/kysymykset/${kysymys.id}`,
              {
                kysymys: event.target.value,
              },
              tokenConfig()
            );
            dispatch({
              type: 'KYSYMYS_MUUTETTIIN',
              payload: {
                kysymys: event.target.value,
                kysymysId: kysymys.id,
              },
            });
          } catch (error) {
            console.log(error);
            dispatch({
              type: 'VIRHE',
              payload: {
                virheteksti: 'Hups! Tapahtui virhe. Aika noloa.',
              },
            });
          }
        }}
      />
      {vastausvaihtoehdot}
    </div>
  );
};

export default Kysymys;
