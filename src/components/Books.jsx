import { useState } from 'react';
import { GENRES } from './Books.constants.js';
import { BooksTable } from './BooksTable.jsx';
import { useAllBooks } from './useAllBooks.js';

const Books = () => {
  const [genre, setGenre] = useState(GENRES.ALL_GENRES);
  const { loading, error, data } = useAllBooks(genre);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const books = data.allBooks;
  console.log('books', books);
  return (
    <div>
      <h2>books</h2>
      <BooksTable books={books} />
      <div>
        <button onClick={() => setGenre(GENRES.REFACTORING)}>
          {GENRES.REFACTORING}
        </button>
        <button onClick={() => setGenre(GENRES.AGILE)}>{GENRES.AGILE}</button>
        <button onClick={() => setGenre(GENRES.PATTERNS)}>
          {GENRES.PATTERNS}
        </button>
        <button onClick={() => setGenre(GENRES.DESIGN)}>{GENRES.DESIGN}</button>
        <button onClick={() => setGenre(GENRES.CRIME)}>{GENRES.CRIME}</button>
        <button onClick={() => setGenre(GENRES.CLASSIC)}>
          {GENRES.CLASSIC}
        </button>
        <button onClick={() => setGenre(GENRES.ALL_GENRES)}>
          {GENRES.ALL_GENRES}
        </button>
      </div>
    </div>
  );
};

export default Books;
