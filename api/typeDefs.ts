import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar DateTime

  type User {
    id: Int
    email: String
    # username: String
    # imageUrl: String
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

  type Post {
    id: Int
    slug: String
    published: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    title: String
    featuredImage: String
    content: String
    # author: User
    authorEmail: String
    comments: [Comment]
    likedBy: [User]
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
  }

  type Query {
    getPosts(category: String, limit: Int, startAfter: Int): [Post]
    getPost(slug: String!): Post
    getUser(email: String!): User
    getCategories: [Category]
  }

  type Mutation {
    createUser(email: String, firstName: String, lastName: String): User
    createDraft(
      slug: String!
      title: String!
      content: String!
      categories: [String]!
      authorEmail: String
      featuredImage: String
      tags: [String]
      # createdAt: DateTime
    ): Post
    updatePost(
      slug: String!
      id: Int
      title: String
      featuredImage: String
      content: String
      categories: [String]
      tags: [String]
    ): Post
  }
`;
