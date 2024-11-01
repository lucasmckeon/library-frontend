import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../graphql/queries.js';
import { GENRES } from './Books.constants.js';
const useAllBooks = (genre) => {
  const options = genre === GENRES.ALL_GENRES ? {} : { variables: { genre } };
  const { loading, error, data } = useQuery(ALL_BOOKS, options);
  return { loading, error, data };
};

export { useAllBooks };
