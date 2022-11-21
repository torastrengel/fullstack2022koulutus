import { useState } from 'react';
import axios from 'axios';

import './index.css';

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [register, setRegister] = useState({
    nimi: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegister({ ...register, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      if (!login.email || !login.password) {
        throw new Error(
          'Sähköpostiosoite tai salasana puuttuu. Täytä molemmat kentät!'
        );
      }
      const { data } = await axios.post('https://localhost:3001/login', {
        email: login.email,
        password: login.password,
      });
      if (data.user.token) {
        localStorage.setItem('tenttisovellus_token', data.user.token);
      }
    } catch (error) {
      console.error('Login.js - Virhe!', error.response.data);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      if (
        !register.email ||
        !register.password ||
        !register.nimi ||
        !register.password2
      ) {
        throw new Error('Täytä kaikki kentät!');
      } else if (register.password !== register.password2) {
        throw new Error(
          'Salasanat eivät täsmää! kirjoita salasanat uudestaan!'
        );
      }

      const { data } = await axios.post('https://localhost:3001/kayttajat', {
        nimi: register.nimi,
        email: register.email,
        password: register.password,
      });
      setRegister({ nimi: '', email: '', password: '', password2: '' });
      console.log(data);
    } catch (error) {
      console.error('Login.js - Rekisteröintivirhe!', error);
    }
  };

  return (
    <div className="login-signup-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Kirjaudu sisään</h2>
        <label htmlFor="email">Sähköpostiosoite</label>
        <input
          required
          onChange={handleLoginChange}
          type="email"
          name="email"
          value={login.email}
        />
        <label htmlFor="password">Salasana:</label>
        <input
          required
          onChange={handleLoginChange}
          type="password"
          name="password"
          value={login.password}
        />
        <button>Kirjaudu sisään</button>
      </form>

      <form className="signup-form" onSubmit={handleRegister}>
        <h2>Rekisteröidy</h2>
        <label htmlFor="nimi">Nimi</label>
        <input
          required
          onChange={handleRegisterChange}
          type="text"
          name="nimi"
          value={register.nimi}
        />
        <label htmlFor="email">Sähköpostiosoite</label>
        <input
          required
          onChange={handleRegisterChange}
          type="email"
          name="email"
          value={register.email}
        />
        <label htmlFor="password">Salasana:</label>
        <input
          required
          onChange={handleRegisterChange}
          type="password"
          name="password"
          value={register.password}
        />
        <label htmlFor="password">Salasana uudelleen:</label>
        <input
          required
          onChange={handleRegisterChange}
          type="password"
          name="password2"
          value={register.password2}
        />
        <button>Rekisteröidy</button>
      </form>
    </div>
  );
};

export default Login;
