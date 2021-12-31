import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar DateTime
  # scalar Upload

  type SignedUploadResponse {
    timestamp: Int
    signature: String
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
  }

  type LikedByCount {
    likedBy: Int
  }

  type Post {
    id: Int
    slug: String
    published: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    title: String
    featuredImage: String
    content: String
    author: User
    authorEmail: String
    comments: [Comment]
    likedBy: [User]
    _count: LikedByCount
    categories: [Category]
    tags: [String]
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
    childComments: [Comment]
  }

  enum Role {
    USER
    ADMIN
    EDITOR
  }

  type Query {
    posts(
      published: Boolean
      category: String
      limit: Int
      startAfter: Int
    ): [Post]
    post(slug: String!): Post
    userByEmail(email: String!): User
    userByUsername(username: String!): User
    categories: [Category]
    likedBy(id: Int): Post
  }

  type Mutation {
    createUser(email: String): User
    createDraft(
      slug: String!
      title: String!
      content: String!
      categories: [String]!
      authorEmail: String
      featuredImage: String
      tags: [String]
    ): Post
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
    likePost(id: Int): Post
    signUpload: SignedUploadResponse
  }
`;
