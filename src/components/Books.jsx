import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../graphql/queries.js';

const Books = () => {
  const result = useQuery(ALL_BOOKS);
  if (result.loading) return <div>Loading...</div>;
  if (result.error) return <div>Error: {result.error.message}</div>;
  const books = result.data.allBooks;
  console.log('books', books);
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
