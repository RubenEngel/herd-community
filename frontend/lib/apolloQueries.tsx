import { gql } from "@apollo/client";
import Categories from '../components/categories';

// --------------- Queries

// export const GET_USER = gql`
//   query GetUser($email: String!) {
//     getUser(email: $email) {
//       firstName
//       lastName
//       username
//       imageUrl
//     }
//   }
// `;

export const GET_ALL_POST_SLUGS = gql`
  query GetAllPostSlugs {
    getPosts {
      slug
    }
  }
`;

export const GET_POST = gql`
  query GetPost($slug: String!) {
    getPost(slug: $slug) {
      id
      slug
      title
      createdAt
      featuredImage
      published
      # author {
      #   firstName
      #   lastName
      #   imageUrl
      # }
      authorEmail
      categories {
        name
      }
      tags
      content
      likedBy {
        firstName
        lastName
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($published: Boolean, $category: String, $limit: Int!, $startAfter: Int) {
    getPosts(published: $published, category: $category, limit: $limit, startAfter: $startAfter) {
      id
      slug
      published
      title
      createdAt
      featuredImage
      authorEmail
      # author {
      #  firstName
      #  lastName
      #  imageUrl
      #  username
      # }
      categories {
        name
      }
      tags
      likedBy {
        id
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      name
    }
  }
`;


// --------------- Mutations

export const ADD_POST = gql`
  mutation CreateDraft(
    $authorEmail: String
    $slug: String!
    $title: String!
    $content: String!
    $tags: [String]
    $categories: [String]!
    $featuredImage: String
  ) {
    createDraft(
      slug: $slug
      title: $title
      content: $content
      tags: $tags
      authorEmail: $authorEmail
      categories: $categories
      featuredImage: $featuredImage
    ) {
      id
      slug
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: Int!
    $slug: String
    $title: String
    $featuredImage: String
    $content: String
    $categories: [String]
    $tags: [String]
  ) {
    updatePost(
      id: $id
      slug: $slug
      title: $title
      featuredImage: $featuredImage
      content: $content
      categories: $categories
      tags: $tags
    ) {
      id
      slug
      title
      featuredImage
      categories {
        name
      }
      tags
    }
  }
`;

export const ADD_USER = gql`
  mutation CreateUser($email: String, $firstName: String, $lastName: String) {
    createUser(email: $email, firstName: $firstName, lastName: $lastName) {
      id
      email
    }
  }
`;

export const CHANGE_PUBLISHED = gql`
  mutation ChangePublished($id: Int!, $published: Boolean!) {
    changePublished(id: $id, published: $published) {
      id
      published
    }
  }
`