import { useContext } from 'react';
import { UserContext } from './context/UserContext';

const Home = () => {
  const { isAuth } = useContext(UserContext);

  return (
    <h1>
      Tenttisovellus - Se tunne, kun kaikki palaset loksahtavat paikoilleen~
    </h1>
  );
};

export default Home;
