import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/login-form';
import RegisterForm from '../components/auth/register-form';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    // Redirigir al dashboard después del login/registro exitoso
    navigate('/dashboard');
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div>
      {isLogin ? (
        <LoginForm 
          onSuccess={handleAuthSuccess}
          onSwitchToRegister={switchToRegister}
        />
      ) : (
        <RegisterForm 
          onSuccess={handleAuthSuccess}
          onSwitchToLogin={switchToLogin}
        />
      )}
    </div>
  );
}