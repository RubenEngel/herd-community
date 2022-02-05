import { gql } from "@apollo/client";

// --------------- Queries

const CORE_USER_FIELDS = gql`
  fragment CoreUserFields on User {
    id
    role
    firstName
    lastName
    username
    imageUrl
    followers {
      id
    }
    following {
      id
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  ${CORE_USER_FIELDS}
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      ...CoreUserFields
      email
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  ${CORE_USER_FIELDS}
  query GetUserByUsername($username: String!) {
    user(username: $username) {
      ...CoreUserFields
      posts {
        id
      }
      _count {
        posts
        followers
        following
        likedPosts
        comments
      }
    }
  }
`;

export const GET_FOLLOWING = gql`
  query GetFollowing($username: String) {
    user(username: $username) {
      following {
        id
        firstName
        lastName
        username
        imageUrl
      }
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query GetFollowers($username: String) {
    user(username: $username) {
      followers {
        id
        firstName
        lastName
        username
        imageUrl
      }
    }
  }
`;

export const GET_ALL_POST_SLUGS = gql`
  query GetAllPostSlugs {
    posts {
      posts {
        slug
      }
    }
  }
`;

const CORE_POST_FIELDS = gql`
  fragment CorePostFields on Post {
    id
    slug
    published
    title
    createdAt
    featuredImage
    author {
      id
      firstName
      lastName
      imageUrl
      username
    }
    categories {
      name
    }
    tags
    wordCount
    _count {
      likedBy
      comments
    }
  }
`;

export const GET_POST = gql`
  ${CORE_POST_FIELDS}
  query GetPost($slug: String!) {
    post(slug: $slug) {
      ...CorePostFields
      content
    }
  }
`;

export const GET_POSTS = gql`
  ${CORE_POST_FIELDS}
  query GetPosts(
    $published: Boolean
    $category: String
    $limit: Int
    $startAfter: Int
    $authorId: Int
  ) {
    posts(
      published: $published
      category: $category
      limit: $limit
      startAfter: $startAfter
      authorId: $authorId
    ) {
      posts {
        ...CorePostFields
      }
      _count
    }
  }
`;

export const GET_POSTS_WITH_EXCERPT = gql`
  ${CORE_POST_FIELDS}
  query GetPosts(
    $published: Boolean
    $category: String
    $limit: Int
    $startAfter: Int
    $authorId: Int
  ) {
    posts(
      published: $published
      category: $category
      limit: $limit
      startAfter: $startAfter
      authorId: $authorId
    ) {
      posts {
        ...CorePostFields
        excerpt
      }
      _count
    }
  }
`;

export const GET_COMMENTS = gql`
  query Query($postId: Int, $authorId: Int) {
    comments(postId: $postId, authorId: $authorId) {
      id
      postId
      author {
        id
        firstName
        lastName
        username
        imageUrl
      }
      content
      createdAt
    }
  }
`;

export const GET_USER_LIKED_POSTS = gql`
  ${CORE_POST_FIELDS}
  query GetUserLikedPosts(
    $likedByUserId: Int
    $limit: Int
    $published: Boolean
    $startAfter: Int
  ) {
    posts(
      likedByUserId: $likedByUserId
      limit: $limit
      startAfter: $startAfter
      published: $published
    ) {
      posts {
        ...CorePostFields
      }
      _count
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

export const LIKED_BY = gql`
  query LikedBy($id: Int) {
    likedBy(id: $id) {
      likedBy {
        id
        firstName
        lastName
        username
      }
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

export const CREATE_COMMENT = gql`
  mutation CreateComment($content: String!, $postId: Int!) {
    createComment(content: $content, postId: $postId) {
      id
      author {
        id
        username
        firstName
        lastName
        imageUrl
      }
      createdAt
      content
      postId
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

export const UPDATE_USER_IMAGE = gql`
  mutation UpdateUserImage($imageUrl: String) {
    updateUser(imageUrl: $imageUrl) {
      imageUrl
    }
  }
`;

export const UPDATE_USER_DETAILS = gql`
  mutation UpdateUserDetails(
    $firstName: String
    $lastName: String
    $username: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
    ) {
      firstName
      lastName
      username
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation Mutation($deleteCommentId: Int!) {
    deleteComment(id: $deleteCommentId) {
      id
    }
  }
`;

export const SIGN_CLOUDINARY_UPLOAD = gql`
  mutation {
    signUpload {
      timestamp
      signature
    }
  }
`;

export const ADD_USER = gql`
  mutation CreateUser($email: String) {
    createUser(email: $email) {
      id
      email
      role
      firstName
      lastName
      imageUrl
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($userId: Int) {
    followUser(userId: $userId) {
      followers {
        id
      }
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($userId: Int) {
    unfollowUser(userId: $userId) {
      followers {
        id
      }
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
`;

export const LIKE_POST = gql`
  mutation LikePost($id: Int!) {
    likePost(id: $id) {
      likedBy {
        id
      }
      _count {
        likedBy
      }
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation UnlikePost($id: Int!) {
    unlikePost(id: $id) {
      likedBy {
        id
      }
      _count {
        likedBy
      }
    }
  }
`;
