import { useContext } from 'react';
import { TenttiContext } from './context/TenttiContext';
import axios from 'axios';
import Vastaus from './Vastaus';

const tokenConfig = require('./utils/tokenConfig');

const Kysymys = ({ kysymys, vastaukset }) => {
  const { dispatch } = useContext(TenttiContext);

  const vastausvaihtoehdot = vastaukset.map((item) => {
    return <Vastaus key={item.id} vastaus={item} kysymys_id={kysymys.id} />;
  });

  const poistaKysymys = async (kys_id) => {
    try {
      const { data } = await axios.delete(
        `https://localhost:3001/admin/kysymykset/${kys_id}`,
        tokenConfig()
      );
      if (data.success) {
        dispatch({
          type: 'ADMIN/POISTA_KYSYMYS',
          payload: {
            kys_id: kysymys.id,
          },
        });
      }
    } catch (error) {
      console.error('Virhe kysymyksen poistossa: ', error);
    }
  };

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
      <button
        onClick={() => poistaKysymys(kysymys.id)}
      >{`Delete question ${kysymys.id}`}</button>
      {vastausvaihtoehdot}
    </div>
  );
};

export default Kysymys;
