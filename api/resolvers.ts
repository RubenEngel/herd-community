import { ApolloError } from "apollo-server-express";
import { Prisma, PrismaClient } from "@prisma/client";
import { GraphQLScalarType } from "graphql";
import cloudinary from "cloudinary/lib/v2";
import "./lib/cloudinaryConfig";

// TODO:

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

const getWordCount = (content: string) => {
  const wordCount = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ").length;
  return wordCount;
};

const getExcerpt = (content: string) => {
  const paragraphRegex = /<p(.*?)>(.*?)<\/p>/g;
  const matches = content.match(paragraphRegex);
  if (!matches) return;
  for (let exceprtIndex = 0; exceprtIndex < matches.length; exceprtIndex++) {
    const exceprtParagraph = matches[exceprtIndex];
    // a length that is too short for a good excerpt
    if (exceprtParagraph.length < 200) {
      continue;
    } else {
      return matches[exceprtIndex];
    }
  }
};

const checkAuth = async (userEmail: string) => {
  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (user) {
    return true;
  } else {
    return false;
  }
};

const signUploadForm = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = await cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: "profile_pictures",
    },
    process.env.CLOUDINARY_API_SECRET
  );

  return { timestamp, signature };
};

export const resolvers = {
  DateTime: dateScalar,

  Query: {
    posts: async (
      _,
      { published, category, limit, startAfter, authorId, likedByUserId }
    ) => {
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

        let variables: any = {
          where: {
            categories: {
              some: {
                name: {
                  contains: category?.toLowerCase().split(" ").join("_"),
                },
              },
            },
            published: published,
            author: {
              id: authorId,
            },
          },
        };

        if (likedByUserId) {
          variables = {
            ...variables,
            where: {
              ...variables.where,
              likedBy: {
                some: {
                  id: likedByUserId,
                },
              },
            },
          };
        }

        const [posts, postCount] = await prisma.$transaction([
          prisma.post.findMany({
            ...cursorParams,
            take: limit,
            ...variables,
            select: {
              id: true,
              title: true,
              featuredImage: true,
              slug: true,
              categories: true,
              author: true,
              createdAt: true,
              excerpt: true,
              published: true,
              wordCount: true,
              tags: true,
              _count: {
                select: {
                  likedBy: true,
                  comments: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          }),
          prisma.post.count({ ...variables }),
        ]);

        return { posts, _count: postCount };
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
    userByEmail: async (_, { email }) => {
      return prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    },
    user: async (_, { username, id }) => {
      return prisma.user.findUnique({
        where: {
          username: username,
          id: id,
        },
        include: {
          posts: true,
          followers: true,
          following: true,
          likedPosts: true,
          _count: {
            select: {
              posts: true,
              followers: true,
              following: true,
              likedPosts: true,
              comments: true,
            },
          },
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
    createUser: async (_, { email }) => {
      return await prisma.user.create({
        data: {
          email: email.toLowerCase(),
        },
      });
    },
    createDraft: async (
      _,
      { slug, title, featuredImage, content, categories, tags, authorEmail }
    ) => {
      try {
        return await prisma.post.create({
          data: {
            slug: slug,
            title: title,
            featuredImage: featuredImage,
            content: content,
            excerpt: getExcerpt(content),
            wordCount: getWordCount(content),
            categories: {
              connect: categories?.map((categoryName) => ({
                name: categoryName.toLowerCase().split(" ").join("_"),
              })),
            },
            tags: tags,
            author: { connect: { email: authorEmail } },
            published: false,
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
            excerpt: content ? getExcerpt(content) : undefined,
            wordCount: content ? getWordCount(content) : undefined,
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
    updateUser: async (
      _,
      { firstName, lastName, username, imageUrl },
      { userEmail }
    ) => {
      try {
        return await prisma.user.update({
          where: {
            email: userEmail,
          },
          data: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            imageUrl: imageUrl,
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
    unlikePost: async (_, { id }, { userEmail }) => {
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
              disconnect: { email: userEmail },
            },
          },
        });
      } catch (error) {
        throw new ApolloError(error as string);
      }
    },
    followUser: async (_, { userId }, { userEmail }) => {
      try {
        return await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            followers: {
              connect: {
                email: userEmail,
              },
            },
          },
          select: {
            followers: true,
          },
        });
      } catch (error) {
        throw new ApolloError(error as string);
      }
    },
    unfollowUser: async (_, { userId }, { userEmail }) => {
      try {
        return await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            followers: {
              disconnect: {
                email: userEmail,
              },
            },
          },
          select: {
            followers: true,
          },
        });
      } catch (error) {
        throw new ApolloError(error as string);
      }
    },
    signUpload: async (_, __, { userEmail }) => {
      try {
        const isSignedIn = await checkAuth(userEmail);
        if (!isSignedIn) return;
        const signedDataRes = await signUploadForm();
        return signedDataRes;
      } catch (error) {
        throw new ApolloError(error as string);
      }
    },
  },
};
