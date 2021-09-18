import { ApolloServer, gql } from "apollo-server-micro";
import { GraphQLScalarType } from "graphql";
import prisma from "../../lib/prisma";
// import { PostInput } from "../../lib/types";

const dateScalar = new GraphQLScalarType({
  name: "DateTime",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
});

const typeDefs = gql`
  scalar DateTime

  type User {
    id: Int
    email: String
    role: Role
    name: String
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
    author: User
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
    getPosts: [Post]
    getPost(postId: Int): Post
    getUser(email: String!): User
  }

  type Mutation {
    createUser(email: String, name: String): User
    createDraft(
      slug: String
      title: String
      featuredImage: String
      content: String
      categories: [String]
      tags: [String]
      authorEmail: String
    ): Post
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      return prisma.post.findMany();
    },
    getPost: async (_, { id }) => {
      return prisma.post.findUnique({
        where: {
          id: id,
        },
      });
    },
    getUser: async (_, { email }) => {
      return prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    },
  },
  Mutation: {
    // publishPost
    // updateUser
    // updatePost
    createUser: async (_, { email, name }) => {
      return await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          name: name.toLowerCase(),
        },
      });
    },
    createDraft: async (
      _,
      { slug, title, featuredImage, content, categories, tags, authorEmail }
    ) => {
      return await prisma.post.create({
        data: {
          slug: slug,
          title: title,
          featuredImage: featuredImage,
          content: content,
          categories: {
            connect: categories.map((categoryName) => ({
              name: categoryName.toLowerCase().split(" ").join("_"),
            })),
          },
          tags: tags,
          author: { connect: { email: authorEmail } },
        },
      });
    },
  },
  DateTime: dateScalar,
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
