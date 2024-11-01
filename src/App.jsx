import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { Routes, Route, Link } from 'react-router-dom';
const App = () => {
  const [token, setToken] = useState(null);
  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }
  return (
    <div>
      <div>
        <button>
          <Link to={'/'}>authors</Link>
        </button>
        <button>
          <Link to={'/books'}>books</Link>
        </button>
        <button>
          <Link to={'/newbook'}>add book</Link>
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newbook" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
