import React, {useState} from 'react';
import {login} from './slice';
import {selectLoginLoading, selectLoginError} from './selectors';
import {useAppDispatch, useAppSelector} from '../../store';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectLoginError);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({email, password}));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
