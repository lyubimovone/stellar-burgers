import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { registerUser } from '../../services/slices/user';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { selectIsAuth } from '../../services/selectors/user';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');
    dispatch(registerUser({ email, name: userName, password }))
      .unwrap()
      .then(() => {
        const from = (location.state as { from?: Location })?.from || '/';
        navigate(from, { replace: true });
      })
      .catch((err: Error) => setError(err.message));
  };

  if (isAuth) {
    return <Navigate to='/' replace />;
  }

  return (
    <RegisterUI
      errorText={error}
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
