import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar DateTime

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
    childComments: [Comment]
  }

  enum Role {
    USER
    ADMIN
    EDITOR
  }

  type PostQuery {
    posts: [Post]
    _count: Int
  }

  type Query {
    posts(
      published: Boolean
      category: String
      limit: Int
      startAfter: Int
      authorId: Int
      likedByUserId: Int
    ): PostQuery
    post(slug: String!): Post
    userByEmail(email: String!): User
    user(username: String, id: Int): User
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
    unlikePost(id: Int): Post
    followUser(userId: Int): User
    unfollowUser(userId: Int): User
    signUpload: SignedUploadResponse
  }
`;
