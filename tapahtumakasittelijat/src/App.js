import './App.css';
import { useState } from 'react';

import Nappain from './Nappain';

function App() {
  const [teksti, setTeksti] = useState('');
  const numerot = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const toiminnot = ['+', '-', '/', '*', '='];

  const handleClick = (x) => {
    if (!teksti && toiminnot.indexOf(x) >= 0) {
      alert('Et voi aloittaa laskentaa operaattorilla. Valitse numero!');
      return;
    }

    if (x === '=') {
      setTeksti(eval(teksti));
      return;
    }

    if (
      teksti.length > 0 &&
      toiminnot.indexOf(x) >= 0 &&
      teksti.slice(-1) === x
    ) {
      alert('Ei peräkkäisiä operaattoreita!');
      return;
    } else if (toiminnot.indexOf(x) >= 0 && isNaN(+teksti.slice(-1))) {
      setTeksti(teksti.slice(0, -1) + x);
    }

    setTeksti(teksti + x);
  };

  const tyhjennaLaskin = () => {
    setTeksti('');
  };

  return (
    <div>
      <div className="laskin">
        <h1>Laskin</h1>
        <span className="naytto">{teksti}</span>
        <div className="nappi-container">
          {numerot.map((item, index) => (
            <Nappain toiminto={handleClick} key={index} arvo={item} />
          ))}
        </div>
        <div className="toiminta-nappi-container">
          {toiminnot.map((item, index) => (
            <Nappain toiminto={handleClick} key={index} arvo={item} />
          ))}
        </div>
      </div>
      <span onClick={tyhjennaLaskin} className="tyhjenna">
        Tyhjennä laskin
      </span>
    </div>
  );
}

export default App;
