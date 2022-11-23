import { useContext } from 'react';
import { TentitDispatchContext } from './TentitContext';
import axios from 'axios';

const tokenConfig = require('./utils/tokenConfig');

const Kysymys = ({ kysymys, vastaukset }) => {
  const dispatch = useContext(TentitDispatchContext);
  const vastausvaihtoehdot = vastaukset.map((item) => {
    return (
      <div key={item.id}>
        <input type="radio" value={item.vastaus} name="kysymys" />{' '}
        <input
          className="vastaus-input"
          type="text"
          value={item.teksti}
          onChange={(event) => {
            dispatch({
              type: 'VASTAUS_MUUTETTIIN',
              payload: {
                uusiVastaus: event.target.value,
                vastausId: item.id,
                kysymysId: kysymys.id,
              },
            });
          }}
        />
        <input
          onChange={(event) => {
            dispatch({
              type: 'OIKEELLISUUS_MUUTETTIIN',
              payload: {
                uusiOikea: event.target.checked,
                vastausId: item.id,
              },
            });
          }}
          type="checkbox"
          name="onkoOikea"
          checked={item.oikein}
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
          console.log(event.target.value);
          try {
            await axios.put(
              `https://localhost:3001/admin/kysymykset/${kysymys.id}`,
              {
                kysymys: event.target.value,
              },
              tokenConfig()
            );
            console.log('Jälkeen', event.target.value);
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
