import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { TenttiContext } from './context/TenttiContext';
import { UserContext } from './context/UserContext';
import tokenConfig from './utils/tokenConfig';

export const KeskeneraisetTentit = () => {
  const { tentti } = useContext(TenttiContext);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(user.userId);
    const haeData = async () => {
      const { data } = await axios.get(
        `https://localhost:3001/tentit/kayttaja/${user.userId}`,
        tokenConfig()
      );
      if (data.success) {
        setData(data.tentit);
        setIsLoading(false);
      }
    };
    haeData();
  }, [user.userId]);

  if (isLoading) {
    return <h2>Ladataan keskeneräisiä tenttejä...</h2>;
  }

  if (data.length === 0) {
    return <h1>Ei keskeneräisiä tenttejä 🥳🎉</h1>;
  }

  // Hae myös käyttäjän tämän hetkiset vastaukset tänne?

  return (
    <div>
      <h1>{`Käyttäjän ${user.userId} keskeneräiset tentit:`}</h1>
      {data.map((item) => {
        return (
          <div className="tentti-card-container">
            <h2>{item.nimi}</h2>
            <p>{item.kuvaus}</p>
          </div>
        );
      })}
    </div>
  );
};
