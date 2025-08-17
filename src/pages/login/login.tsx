import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { loginUser } from '../../services/slices/user';
import { selectIsAuth } from '../../services/selectors/user';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

export const Login: FC = () => {
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
    dispatch(loginUser({ email, password }))
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
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
