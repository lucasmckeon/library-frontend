import { BooksTable } from './BooksTable.jsx';
import { useAllBooks } from './useAllBooks.js';

const Recommend = () => {
  const favoriteGenre = 'patterns'; //HARD CODED FOR NOW
  const { data, loading, error } = useAllBooks(favoriteGenre);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error {error.message}</div>;
  const books = data.allBooks;
  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre: <strong>{favoriteGenre}</strong>
      </p>
      <BooksTable books={books} genre={favoriteGenre} />
    </div>
  );
};

export { Recommend };
