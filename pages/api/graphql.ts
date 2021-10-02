import { ApolloServer, gql, IResolvers } from "apollo-server-micro";
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
    getPosts(category: String, limit: Int, startAfter: Int): [Post]
    getPost(slug: String!): Post
    getUser(email: String!): User
  }

  type Mutation {
    createUser(email: String, firstName: String, lastName: String): User
    createDraft(
      slug: String
      title: String
      featuredImage: String
      content: String
      categories: [String]
      tags: [String]
      authorEmail: String
      createdAt: DateTime
    ): Post
  }
`;

const resolvers = {
  Query: {
    getPosts: async (_, { category, limit, startAfter }) => {
      if (category.toLowerCase() === "all") category = null;
      let cursorParams = {};
      if (startAfter) {
        cursorParams = {
          skip: 1,
          cursor: {
            id: startAfter,
          },
        };
      }
      return prisma.post.findMany({
        ...cursorParams,
        take: limit,
        where: {
          categories: {
            some: {
              name: {
                contains: category?.toLowerCase().split(" ").join("_"),
              },
            },
          },
        },
        include: {
          categories: true,
        },
      });
    },
    getPost: async (_, { slug }) => {
      return prisma.post.findUnique({
        where: {
          slug: slug,
        },
        include: {
          categories: true,
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
    // updatePost
    // updateUser
    // createComment
    // deleteComment
    createUser: async (_, { email, firstName, lastName }) => {
      return await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          firstName: firstName ? firstName.toLowerCase() : undefined,
          lastName: lastName ? lastName.toLowerCase() : undefined,
        },
      });
    },
    createDraft: async (
      _,
      {
        slug,
        title,
        featuredImage,
        content,
        categories,
        tags,
        authorEmail,
        createdAt,
      }
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
          // author: { connect: { email: authorEmail } },
          authorEmail: authorEmail,
          published: true,
          createdAt: createdAt,
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
