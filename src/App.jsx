import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { LoginForm } from './components/LoginForm.jsx';
import { Recommend } from './components/Recommend.jsx';
import { Notify } from './components/Notify.jsx';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
const App = () => {
  const [token, setToken] = useState(() =>
    localStorage.getItem('library-user-token')
  );
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 2000);
  };
  const onSuccessfulLogin = (tokn) => {
    setToken(tokn);
    localStorage.setItem('library-user-token', tokn);
    navigate('/');
  };
  const onLogout = () => {
    setToken(null);
    localStorage.removeItem('library-user-token');
    navigate('/');
  };
  return (
    <div>
      <div>
        <button>
          <Link to={'/'}>books</Link>
        </button>
        <button>
          <Link to={'/authors'}>authors</Link>
        </button>
        {token && (
          <>
            <button>
              <Link to={'/newbook'}>add book</Link>
            </button>
            <button>
              <Link to={'/recommend'}>recommend</Link>
            </button>
          </>
        )}

        {token ? (
          <button onClick={onLogout}>logout</button>
        ) : (
          <button>
            <Link to={'/login'}>login</Link>
          </button>
        )}
      </div>
      <Notify errorMessage={errorMessage} />
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/" element={<Books />} />
        <Route path="/newbook" element={<NewBook />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route
          path="/login"
          element={
            <LoginForm
              onSuccessfulLogin={onSuccessfulLogin}
              setToken={setToken}
              setError={notify}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
