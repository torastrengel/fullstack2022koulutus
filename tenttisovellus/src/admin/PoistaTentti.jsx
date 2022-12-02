import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import tokenConfig from '../utils/tokenConfig';

const PoistaTentti = () => {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState('');

  if (statusMessage) {
    return <h1>{statusMessage}</h1>;
  }

  return (
    <div>
      <h1>Hellou!</h1>
    </div>
  );
};

export default PoistaTentti;
