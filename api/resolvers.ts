import { ApolloError } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import { GraphQLScalarType } from "graphql";
import { User } from "./node_modules/.prisma/client/index";

const dateScalar = new GraphQLScalarType({
  name: "DateTime",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
});

const prisma = new PrismaClient({
  log: ["info"],
});

export const resolvers = {
  Query: {
    posts: async (_, { published, category, limit, startAfter }) => {
      try {
        if (category?.toLowerCase() === "all") category = null;
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
            published: published,
          },
          include: {
            categories: true,
            author: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (error) {
        throw new ApolloError(error as string);
      }
    },
    post: async (_, { slug }) => {
      return prisma.post.findUnique({
        where: {
          slug: slug,
        },
        include: {
          categories: true,
          author: true,
          likedBy: true,
          _count: {
            select: { likedBy: true },
          },
        },
      });
    },
    user: async (_, { email }) => {
      return prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    },
    categories: async () => {
      return prisma.category.findMany();
    },
    likedBy: async (_, { id }) => {
      return prisma.post.findUnique({
        where: {
          id: id,
        },
        select: {
          likedBy: true,
        },
      });
    },
  },
  Mutation: {
    // updateUser
    // createComment
    // deleteComment
    createUser: async (_, { email }) => {
      return await prisma.user.create({
        data: {
          email: email.toLowerCase(),
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
        // createdAt,
      }
    ) => {
      try {
        return await prisma.post.create({
          data: {
            slug: slug,
            title: title,
            featuredImage: featuredImage,
            content: content,
            categories: {
              connect: categories?.map((categoryName) => ({
                name: categoryName.toLowerCase().split(" ").join("_"),
              })),
            },
            tags: tags,
            author: { connect: { email: authorEmail } },
            // authorEmail: authorEmail,
            published: true,
            // createdAt: createdAt,
          },
        });
      } catch (error) {
        throw new ApolloError(error as string);
      }
    },
    updatePost: async (
      _,
      { id, slug, title, featuredImage, content, categories, tags }
    ) => {
      // TODO: if slug or id
      try {
        return await prisma.post.update({
          where: {
            id: id,
          },
          data: {
            slug: slug,
            title: title,
            featuredImage: featuredImage,
            content: content,
            categories: {
              set: categories.map((category) => ({ name: category })),
            },
            tags: tags,
          },
        });
      } catch (error) {
        throw new ApolloError(error as string);
      }
    },
    changePublished: async (_, { id, published }) => {
      try {
        return await prisma.post.update({
          where: {
            id,
          },
          data: {
            published,
          },
        });
      } catch (error) {
        throw new ApolloError(error as string);
      }
    },
    likePost: async (_, { id }, { userEmail }) => {
      try {
        return await prisma.post.update({
          where: {
            id,
          },
          include: {
            likedBy: true,
            _count: {
              select: { likedBy: true },
            },
          },
          data: {
            likedBy: {
              connect: { email: userEmail },
            },
          },
        });
      } catch (error) {
        throw new ApolloError(error as string);
      }
    },
  },
  DateTime: dateScalar,
};
