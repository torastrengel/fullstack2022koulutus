import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Login = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('tenttisovellus_token');

  useEffect(() => {
    isLoggedIn && navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login-signup-container">
      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default Login;
