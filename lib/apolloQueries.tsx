import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      firstName
      lastName
      username
      photoURL
    }
  }
`;

export const GET_ALL_POST_SLUGS = gql`
  query getAllPostSlugs {
    posts {
      slug
    }
  }
`;

export const GET_POST = gql`
  query getPost($slug: String!) {
    post(slug: $slug) {
      slug
      title
      date
      featuredImage
      author {
        firstName
        lastName
        username
        photoURL
      }
      categories
      tags
      content
      likes
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts($category: String, $limit: Int!, $startAfter: String) {
    posts(category: $category, limit: $limit, startAfter: $startAfter) {
      slug
      title
      date
      featuredImage
      author {
        firstName
        lastName
        username
        photoURL
      }
      categories
      tags
      likes
    }
  }
`;
