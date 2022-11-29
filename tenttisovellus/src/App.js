import { useReducer, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { TentitContext, TentitDispatchContext } from './TentitContext';
import axios from 'axios';
import tentitReducer from './tenttiReducer';

import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import TenttiLista from './TenttiLista';
import Tentti from './Tentti';
import ProtectedRoute from './ProtectedRoute';

const token = localStorage.getItem('tenttisovellus_token');

function App() {
  const [tentit, dispatch] = useReducer(tentitReducer, {});

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
    <TentitContext.Provider value={tentit}>
      <TentitDispatchContext.Provider value={dispatch}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="tentit" element={<TenttiLista />} />
            <Route
              path="tentit/:id"
              element={
                <ProtectedRoute token={token}>
                  <Tentti />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </TentitDispatchContext.Provider>
    </TentitContext.Provider>
  );
}

export default App;
