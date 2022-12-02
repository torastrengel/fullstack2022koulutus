import { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { TenttiContextProvider } from './context/TenttiContext';
import axios from 'axios';

/* USERIN KOMPONENTIT */
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import TenttiLista from './TenttiLista';
import Tentti from './Tentti';
import ProtectedRoute from './ProtectedRoute';

/* ADMIN KOMPONENTIT */
import LisaaTentti from './admin/LisaaTentti';
import PoistaTentti from './admin/PoistaTentti';

const App = () => {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    const isTokenValid = async () => {
      const { data } = await axios.post('https://localhost:3001/token', {
        token: localStorage.getItem('tenttisovellus_token'),
      });
      if (!data.success) {
        localStorage.removeItem('tenttisovellus_token');
        localStorage.removeItem('tenttisovellus_userId');
        localStorage.removeItem('tenttisovellus_user_email');
        localStorage.removeItem('tenttisovellus_user_is_admin');
        setUser(null);
        alert(
          'Kirjautuminen vanhentunut. Ole hyvä ja kirjaudu sisään uudelleen'
        );
      }
    };
    localStorage.getItem('tenttisovellus_token') && isTokenValid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TenttiContextProvider>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="tentit" element={<TenttiLista />} />
        <Route
          path="tentit/:id"
          element={
            <ProtectedRoute>
              <Tentti />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route
          path="admin/lisaatentti"
          element={
            <ProtectedRoute isAdminRoute={true}>
              <LisaaTentti />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/poistatentti"
          element={
            <ProtectedRoute isAdminRoute={true}>
              <PoistaTentti />
            </ProtectedRoute>
          }
        />
      </Routes>
    </TenttiContextProvider>
  );
};

export default App;
