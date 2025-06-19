import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from 'src/services/store';
import { useNavigate } from 'react-router-dom';
import { registerUser } from 'src/services/slices/profileSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { error, isAuth, isLoading } = useAppSelector(
    (state) => state.registerSlice
  );
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({ name: userName, email: email, password: password })
    );
  };

  useEffect(() => {
    if (isAuth && !isLoading) {
      navigate('/login');
    }
  }, [isAuth, navigate, isLoading]);

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
