import { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
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

const App = () => {
  useEffect(() => {
    const isTokenValid = async () => {
      const { data } = await axios.post('https://localhost:3001/token', {
        token: localStorage.getItem('tenttisovellus_token'),
      });
      if (!data.success) {
        localStorage.removeItem('tenttisovellus_token');
        alert(
          'Kirjautuminen vanhentunut. Ole hyvä ja kirjaudu sisään uudelleen'
        );
      }
    };
    localStorage.getItem('tenttisovellus_token') && isTokenValid();
  }, []);

  return (
    <UserContextProvider>
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
        </Routes>
      </TenttiContextProvider>
    </UserContextProvider>
  );
};

export default App;
