import { gql } from '@apollo/client';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        bookCount
      }
      published
    }
  }
`;

export { ALL_BOOKS, ALL_AUTHORS };
