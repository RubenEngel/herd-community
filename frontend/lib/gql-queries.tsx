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

export const SEARCH_USERS = gql`
  query SearchUsers($searchTerm: String!) {
    searchUsers(searchTerm: $searchTerm) {
      users {
        id
        firstName
        lastName
        username
        imageUrl
      }
      _count
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
    submitted
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

export const SEARCH_POSTS = gql`
  ${CORE_POST_FIELDS}
  query SearchPosts($searchTerm: String!, $limit: Int!, $startAfter: Int) {
    searchPosts(
      searchTerm: $searchTerm
      limit: $limit
      startAfter: $startAfter
    ) {
      posts {
        ...CorePostFields
      }
      _count
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
    $submitted: Boolean
    $category: String
    $limit: Int
    $startAfter: Int
    $authorId: Int
    $searchTerm: String
  ) {
    posts(
      published: $published
      submitted: $submitted
      category: $category
      limit: $limit
      startAfter: $startAfter
      authorId: $authorId
      searchTerm: $searchTerm
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

const CORE_COMMENT_FIELDS = gql`
  fragment CoreCommentFields on Comment {
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
    parentCommentId
  }
`;

export const GET_COMMENTS_FOR_POST = gql`
  ${CORE_COMMENT_FIELDS}
  query Query($postId: Int) {
    # can also query by author
    comments(postId: $postId) {
      ...CoreCommentFields
      childComments {
        ...CoreCommentFields
        childComments {
          ...CoreCommentFields
        }
      }
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

export const POST_LIKED_BY = gql`
  query PostLikedBy($id: Int) {
    postLikedBy(id: $id) {
      id
      firstName
      lastName
      username
    }
  }
`;

export const COMMENT_LIKED_BY = gql`
  query CommentLikedBy($id: Int!) {
    commentLikedBy(id: $id) {
      id
      username
      imageUrl
      firstName
      lastName
    }
  }
`;

// --------------- Mutations

export const CREATE_DRAFT = gql`
  mutation CreateDraft(
    $slug: String!
    $title: String!
    $content: String!
    $tags: [String]
    $categories: [String]!
    $featuredImage: String
    $submitted: Boolean
  ) {
    createDraft(
      slug: $slug
      title: $title
      content: $content
      tags: $tags
      categories: $categories
      featuredImage: $featuredImage
      submitted: $submitted
    ) {
      id
      slug
    }
  }
`;

export const CREATE_COMMENT = gql`
  ${CORE_COMMENT_FIELDS}
  mutation CreateComment(
    $content: String!
    $postId: Int!
    $parentCommentId: Int
  ) {
    createComment(
      content: $content
      postId: $postId
      parentCommentId: $parentCommentId
    ) {
      ...CoreCommentFields
      parentComment {
        id
        parentComment {
          id
        }
      }
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
  mutation FollowUser($userId: Int!) {
    followUser(userId: $userId) {
      followers {
        id
      }
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($userId: Int!) {
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
      slug
      published
    }
  }
`;

export const CHANGE_SUBMITTED = gql`
  mutation ChangeSubmitted($id: Int!, $submitted: Boolean!) {
    changeSubmitted(id: $id, submitted: $submitted) {
      id
      slug
      submitted
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($id: Int!) {
    likePost(id: $id) {
      id
      likedBy {
        id
      }
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation UnlikePost($id: Int!) {
    unlikePost(id: $id) {
      id
      likedBy {
        id
      }
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation LikeComment($likeCommentId: Int!) {
    likeComment(id: $likeCommentId) {
      id
      likedBy {
        id
        username
        firstName
        lastName
        imageUrl
      }
    }
  }
`;

export const UNLIKE_COMMENT = gql`
  mutation UnlikeComment($unlikeCommentId: Int!) {
    unlikeComment(id: $unlikeCommentId) {
      id
      likedBy {
        id
        username
        firstName
        lastName
        imageUrl
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($deleteCommentId: Int!) {
    deleteComment(id: $deleteCommentId) {
      id
    }
  }
`;
