import { gql } from '@apollo/client';

export const GET_POSTS = gql`
query getPosts($first: Int!,
               $after: String!,
               $category: String!) {
  posts(first: $first, after: $after, where: {categoryName: $category}) {
    edges {
      cursor
      node {
        title
        excerpt
        author {
          node {
            firstName
            lastName
          }
        }
        slug
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          edges {
            node {
              name
            }
          }
        }
        tags {
          edges {
            node {
              name
            }
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}`