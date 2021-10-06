import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      firstName
      lastName
      # username
      # imageUrl
    }
  }
`;

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
      slug
      title
      createdAt
      featuredImage
      author {
        firstName
        lastName
        # username
        # imageUrl
      }
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
  query GetPosts($category: String, $limit: Int!, $startAfter: Int) {
    getPosts(category: $category, limit: $limit, startAfter: $startAfter) {
      id
      slug
      title
      createdAt
      featuredImage
      author {
        firstName
        lastName
        # imageUrl
        # username
      }
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

export const ADD_POST = gql`
  mutation CreateDraft(
    $authorEmail: String
    $slug: String
    $title: String
    $content: String
    $tags: [String]
    $categories: [String]
    $createdAt: DateTime
    $featuredImage: String
  ) {
    createDraft(
      slug: $slug
      title: $title
      content: $content
      tags: $tags
      authorEmail: $authorEmail
      categories: $categories
      createdAt: $createdAt
      featuredImage: $featuredImage
    ) {
      id
      slug
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $slug: String!
    $id: Int
    $title: String
    $featuredImage: String
    $content: String
    $categories: [String]
    $tags: [String]
  ) {
    updatePost(
      slug: $slug
      id: $id
      title: $title
      featuredImage: $featuredImage
      content: $content
      categories: $categories
      tags: $tags
    ) {
      id
      slug
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

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      name
    }
  }
`;
