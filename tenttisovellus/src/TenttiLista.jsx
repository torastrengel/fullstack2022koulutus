import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';

const TenttiLista = () => {
  const [tenttiNapit, setTenttiNapit] = useState([]);

  useEffect(() => {
    const haeTentit = async () => {
      const { data } = await axios.get('https://localhost:3001/tentit');
      const result = data.map((item) => (
        <Link key={item.id} to={`/tentit/${item.id}`}>
          <Button>{item.nimi}</Button>
        </Link>
      ));
      setTenttiNapit(result);
    };
    haeTentit();
  }, []);

  return (
    <div>
      <h1>Valittavissa olevat tentit:</h1>
      <div className="tenttinapit-container">{tenttiNapit}</div>
    </div>
  );
};

export default TenttiLista;