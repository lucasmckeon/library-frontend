import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations.js';
import { useEffect, useState } from 'react';

const LoginForm = ({ onSuccessfulLogin, setError }) => {
  const [login, result] = useMutation(LOGIN, {
    onError: (e) => setError(e.graphQLErrors[0].message),
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
    setUsername('');
    setPassword('');
  };
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      onSuccessfulLogin(token);
    }
  }, [onSuccessfulLogin, result.data]);
  if (result.error) {
    setTimeout(() => result.reset(), 2000);
    return <div>Error logging in: {result.error.message}</div>;
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          username:{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            name="username"
          />
        </label>
        <label>
          password:{' '}
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            name="password"
          />
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export { LoginForm };
