import { ApolloError, AuthenticationError } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import { GraphQLScalarType } from "graphql";
import cloudinary from "cloudinary/lib/v2";
import "./lib/cloudinaryConfig";

const dateScalar = new GraphQLScalarType({
  name: "DateTime",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
});

export const prisma = new PrismaClient({
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
      {
        published,
        category,
        limit,
        startAfter,
        authorId,
        likedByUserId,
        searchTerm,
      }
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

        if (searchTerm) {
          const searchTermArray = searchTerm.split(" ");
          const prismaSearchString = searchTermArray
            .map((term, index) => {
              if (index > 0) {
                return ` & ${term}`;
              } else {
                return term;
              }
            })
            .join("");
          variables = {
            ...variables,
            where: {
              ...variables.where,
              OR: {
                content: {
                  search: prismaSearchString,
                  mode: "insensitive",
                },
                title: {
                  search: prismaSearchString,
                  mode: "insensitive",
                },
              },
            },
          };
        }

        const [posts, postCount] = await prisma.$transaction([
          prisma.post.findMany({
            ...cursorParams,
            ...variables,
            take: limit,
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
        console.error(error);
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
            select: { likedBy: true, comments: true },
          },
        },
      });
    },
    comments: async (
      _,
      { postId, authorId }: { postId: number; authorId: number }
    ) => {
      try {
        return await prisma.comment.findMany({
          where: {
            postId: postId,
            authorId: authorId,
          },
          include: {
            author: true,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    searchUsers: async (_, { searchTerm }: { searchTerm: string }) => {
      const searchTermArray = searchTerm.split(" ");
      try {
        const [users, userCount] = await prisma.$transaction([
          prisma.user.findMany({
            where: {
              OR: [
                {
                  AND: [
                    ...searchTermArray.map((term) => ({
                      firstName: {
                        contains: term,
                      },
                    })),
                  ],
                },
                {
                  AND: [
                    ...searchTermArray.map((term) => ({
                      lastName: {
                        contains: term,
                      },
                    })),
                  ],
                },
                {
                  AND: [
                    ...searchTermArray.map((term) => ({
                      username: {
                        contains: term,
                      },
                    })),
                  ],
                },
              ],
            },
          }),
          prisma.user.count({
            where: {
              OR: [
                {
                  AND: [
                    ...searchTermArray.map((term) => ({
                      firstName: {
                        contains: term,
                      },
                    })),
                  ],
                },
                {
                  AND: [
                    ...searchTermArray.map((term) => ({
                      lastName: {
                        contains: term,
                      },
                    })),
                  ],
                },
                {
                  AND: [
                    ...searchTermArray.map((term) => ({
                      username: {
                        contains: term,
                      },
                    })),
                  ],
                },
              ],
            },
          }),
        ]);
        return {
          users: users,
          _count: userCount,
        };
      } catch (error) {
        console.error(error);
      }
    },
    userByEmail: async (_, { email }) => {
      try {
        return await prisma.user.findUnique({
          where: {
            email: email,
          },
          include: {
            followers: true,
            following: true,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    user: async (_, { username, id }) => {
      try {
        return await prisma.user.findUnique({
          where: {
            username: username,
            id: id,
          },
          include: {
            posts: {
              where: {
                published: true,
              },
            },
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
      } catch (error) {
        console.error(error);
      }
    },
    categories: async () => {
      try {
        return await prisma.category.findMany();
      } catch (error) {
        console.error(error);
      }
    },
    likedBy: async (_, { id }) => {
      try {
        return await prisma.post.findUnique({
          where: {
            id: id,
          },
          select: {
            likedBy: true,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  Mutation: {
    createUser: async (_, { email }) => {
      try {
        return await prisma.user.create({
          data: {
            email: email.trim().toLowerCase(),
          },
        });
      } catch (error) {
        console.error(error);
      }
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
        console.error(error);
      }
    },
    createComment: async (_, { content, postId }, { userEmail }) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");
      try {
        return await prisma.comment.create({
          data: {
            content: content,
            post: {
              connect: {
                id: postId,
              },
            },
            author: {
              connect: {
                email: userEmail,
              },
            },
          },
          include: {
            author: true,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    deleteComment: async (_, { id }, { userEmail }) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");
      try {
        const res = await prisma.comment.findUnique({
          where: {
            id: 17,
          },
          select: {
            author: {
              select: {
                email: true,
              },
            },
          },
        });

        if (res && res?.author.email !== userEmail) {
          throw new AuthenticationError(
            "User's email does not match comment's author"
          );
        }

        return await prisma.comment.delete({
          where: {
            id,
          },
        });
      } catch (error) {
        console.error(error);
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
        console.error(error);
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
        console.error(error);
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
        console.error(error);
      }
    },
    changeSubmitted: async (_, { id, submitted }) => {
      try {
        return await prisma.post.update({
          where: {
            id,
          },
          data: {
            submitted,
          },
        });
      } catch (error) {
        console.error(error);
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
        console.error(error);
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
        console.error(error);
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
        console.error(error);
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
        console.error(error);
      }
    },
    signUpload: async (_, __, { userEmail }) => {
      try {
        const isSignedIn = await checkAuth(userEmail);
        if (!isSignedIn) return;
        const signedDataRes = await signUploadForm();
        return signedDataRes;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
