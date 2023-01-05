import { gql } from 'apollo-angular'

export const GET_SHORT_PUBLICATION = gql`
  query publications {
      edges {
        node {
          id
          journal
          authors
          title
          year
        }
      }
  }
`
