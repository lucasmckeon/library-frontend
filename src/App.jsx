import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { LoginForm } from './components/LoginForm.jsx';
import { Recommend } from './components/Recommend.jsx';
import { Notify } from './components/Notify.jsx';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import { BOOK_ADDED } from './graphql/subscriptions.js';
import { ALL_BOOKS } from './graphql/queries.js';
import { updateAllBooksCache } from './utils.js';
const App = () => {
  const [token, setToken] = useState(() =>
    localStorage.getItem('library-user-token')
  );
  const [errorMessage, setErrorMessage] = useState('');
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data);
      const addedBook = data.data.bookAdded;
      notify(`${addedBook.title} added`);
      updateAllBooksCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });
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
