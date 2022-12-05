import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { TenttiContext } from './context/TenttiContext';

import Button from '@mui/material/Button';

const TenttiLista = () => {
  const { dispatch, tentti } = useContext(TenttiContext);

  useEffect(() => {
    const haeTentit = async () => {
      const { data } = await axios.get('https://localhost:3001/tentit');
      if (data.success) {
        dispatch({
          type: 'HAE_KAIKKI_TENTIT',
          payload: {
            tentit: data.results,
          },
        });
      } else {
        return <h1>Tenttien haussa virhe!</h1>;
      }
    };
    haeTentit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Valittavissa olevat tentit:</h1>
      <div className="tenttinapit-container">
        {tentti.tenttilista?.map((item) => (
          <Link key={item.id} to={`/tentit/${item.id}`}>
            <Button>{item.nimi}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TenttiLista;
