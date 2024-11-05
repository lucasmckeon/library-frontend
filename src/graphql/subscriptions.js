import { gql } from '@apollo/client';
import { BOOK_DETAILS } from './fragments.js';

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export { BOOK_ADDED };
