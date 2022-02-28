import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar DateTime

  type SignedUploadResponse {
    timestamp: Int
    signature: String
    publicId: String
    transforms: String
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type User {
    id: Int
    email: String
    username: String
    imageUrl: String
    role: Role
    firstName: String
    lastName: String
    posts: [Post]
    likedPosts: [Post]
    comments: [Comment]
    likedComments: [Comment]
    following: [User]
    followers: [User]
    _count: UserRelationCounts
  }

  type UserRelationCounts {
    posts: Int
    followers: Int
    following: Int
    likedPosts: Int
    comments: Int
  }

  type Post {
    id: Int
    slug: String
    published: Boolean
    submitted: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    title: String
    featuredImage: String
    content: String
    excerpt: String
    wordCount: Int
    author: User
    authorEmail: String
    comments: [Comment]
    likedBy: [User]
    categories: [Category]
    tags: [String]
    _count: PostRelationCounts
  }

  type PostRelationCounts {
    likedBy: Int
    comments: Int
  }

  type Category {
    id: Int
    name: String
    posts: [Post]
  }

  type Comment {
    id: Int
    content: String
    author: User
    authorId: Int
    likedBy: [User]
    createdAt: DateTime
    post: Post
    postId: Int
    parentComment: Comment
    parentCommentId: Int
    childComments: [Comment]
  }

  enum Role {
    USER
    ADMIN
    EDITOR
  }

  type PostQueryResult {
    posts: [Post]
    _count: Int
  }

  type UserSearchResult {
    users: [User]
    _count: Int
  }

  type LikeMutationResult {
    id: Int
    likedBy: [User!]
  }

  type Query {
    posts(
      published: Boolean
      submitted: Boolean
      category: String
      limit: Int
      startAfter: Int
      authorId: Int
      likedByUserId: Int
      searchTerm: String
    ): PostQueryResult
    post(slug: String!): Post
    postLikedBy(id: Int): [User]
    searchUsers(searchTerm: String!): UserSearchResult
    comments(postId: Int, authorId: Int): [Comment]
    commentLikedBy(id: Int!): [User] # only likedBy array returned on object
    commentReplies(id: Int!): [Comment]
    userByEmail(email: String!): User
    user(username: String, id: Int): User
    categories: [Category]
  }

  type Mutation {
    createUser(email: String): User
    createDraft(
      slug: String!
      title: String!
      content: String!
      categories: [String]!
      featuredImage: String
      tags: [String]
      submitted: Boolean
    ): Post
    createComment(content: String!, postId: Int!, parentCommentId: Int): Comment
    deleteComment(id: Int!): Comment
    updatePost(
      id: Int!
      slug: String
      title: String
      featuredImage: String
      content: String
      categories: [String]
      tags: [String]
    ): Post
    updateUser(
      firstName: String
      lastName: String
      username: String
      imageUrl: String
    ): User
    changePublished(id: Int!, published: Boolean!): Post
    changeSubmitted(id: Int!, submitted: Boolean!): Post
    likePost(id: Int!): LikeMutationResult
    unlikePost(id: Int!): LikeMutationResult
    likeComment(id: Int!): LikeMutationResult
    unlikeComment(id: Int!): LikeMutationResult
    followUser(userId: Int!): User
    unfollowUser(userId: Int!): User
    signUpload(publicId: String!, transforms: String!): SignedUploadResponse
  }
`;
