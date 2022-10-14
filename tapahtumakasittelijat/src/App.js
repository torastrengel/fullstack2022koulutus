import './App.css';
import { useState } from 'react';

import Nappain from './Nappain';

function App() {
  const [teksti, setTeksti] = useState('');
  const numerot = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const toiminnot = ['+', '-', '/', '*', '='];

  // Tarkista onko käyttäjän syöttämä luku operaattori
  const onOperaattori = (arvo) => {
    return toiminnot.indexOf(arvo) >= 0;
  };

  const handleClick = (x) => {
    if (!teksti && onOperaattori(x)) {
      alert('Et voi aloittaa laskentaa operaattorilla. Valitse numero!');
      return;
    }

    if (x === '=') {
      setTeksti(eval(teksti));
      return;
    }

    // Ei samaa peräkkäistä operaattoria --> +++ ei onnaa

    if (teksti.length > 0 && onOperaattori(x) && teksti.slice(-1) === x) {
      alert('Ei peräkkäisiä operaattoreita!');
      return;
    }

    // Estä useiden operaattoreiden lisääminen laskutoimitukseen --> 1 +-/ 4 ++ 2 ei enää toimi

    if (onOperaattori(x) && isNaN(+teksti.slice(-1))) {
      setTeksti(teksti.slice(0, -1) + x);
      return;
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
