import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../graphql/queries.js';
import { EDIT_AUTHOR } from '../graphql/mutations.js';
import Select from 'react-select';
import { useState } from 'react';
const SetBirthYear = ({ updateAuthor, authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const born = e.currentTarget.born.value;
    updateAuthor(selectedAuthor, born);
  };
  const options = authors.map((a) => ({ value: a.name, label: a.name }));
  return (
    <form onSubmit={handleSubmit}>
      <Select
        onChange={(o) => setSelectedAuthor(o.value)}
        options={options}
      ></Select>
      <label>
        born:
        <input name="born" />
      </label>
      <button type="submit">update author</button>
    </form>
  );
};

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);
  const [updateBirthYear, { data }] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  if (result.loading) return <div>Loading...</div>;
  const authors = [...result.data.allAuthors];
  const updateAuthor = (name, born) =>
    updateBirthYear({ variables: { name, setBornTo: parseInt(born) } });
  if (data) {
    console.log('DATA', data);
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthYear authors={authors} updateAuthor={updateAuthor} />
    </div>
  );
};

export default Authors;
