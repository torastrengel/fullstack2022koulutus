import { useState, useContext } from 'react';
import { UserContext } from './context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuth } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  console.count('LoginForm.jsx rendered: ');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !pwd) {
        throw new Error('Sähköposti tai salasana puuttuu!');
      }
      const { data } = await axios.post('https://localhost:3001/login', {
        email: email,
        password: pwd,
      });

      if (data.user.token) {
        const { userId, email, isAdmin } = jwt_decode(data.user.token, 'apina');
        localStorage.setItem('tenttisovellus_token', data.user.token);
        localStorage.setItem('tenttisovellus_user_id', userId);
        localStorage.setItem('tenttisovellus_user_email', email);
        localStorage.setItem('tenttisovellus_user_is_admin', isAdmin);
        setUser({
          userId,
          email,
          isAdmin,
          token: data.user.token,
        });
        setIsAuth(true);
        setStatusMessage(data.message);
        setTimeout(() => {
          setStatusMessage('');
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (statusMessage) {
    return (
      <div>
        <h1>{statusMessage}</h1>
        <p>Sinut siirretään hetken kuluttua etusivulle 👋</p>
      </div>
    );
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Kirjaudu sisään</h2>
      <label htmlFor="email">Sähköpostiosoite</label>
      <input
        required
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        value={email}
      />
      <label htmlFor="password">Salasana:</label>
      <input
        required
        onChange={(e) => setPwd(e.target.value)}
        type="password"
        name="password"
        value={pwd}
      />
      <button>Kirjaudu sisään</button>
    </form>
  );
};

export default LoginForm;
