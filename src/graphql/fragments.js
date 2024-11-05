import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      bookCount
    }
    published
    genres
  }
`;
export { BOOK_DETAILS };
