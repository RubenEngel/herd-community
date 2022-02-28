import { AuthenticationError } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import { GraphQLScalarType } from "graphql";
import cloudinary from "cloudinary/lib/v2";
import "../lib/cloudinaryConfig";

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

const getUser = async (userEmail: string) => {
  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (user) {
    return user;
  } else {
    return false;
  }
};

export const resolvers = {
  DateTime: dateScalar,
  // ----------------- Queries ----------------- //
  Query: {
    posts: async (
      _,
      {
        published,
        submitted,
        category,
        limit,
        startAfter,
        authorId,
        likedByUserId,
        searchTerm,
      }
    ) => {
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
          submitted: submitted,
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
      return await prisma.comment.findMany({
        where: {
          postId: postId,
          authorId: authorId,
          parentCommentId: null,
        },
        include: {
          author: true,
          likedBy: true,
          // allow nested comments to go 2 levels deep
          childComments: {
            include: {
              childComments: {
                include: {
                  childComments: true,
                  author: true,
                },
              },
              author: true,
            },
          },
          _count: {
            select: {
              childComments: true,
            },
          },
        },
      });
    },
    searchUsers: async (_, { searchTerm }: { searchTerm: string }) => {
      const searchTermArray = searchTerm.toLocaleLowerCase().trim().split(" ");
      console.log(
        searchTermArray.map((term, index) => {
          if (index > 0) {
            return {
              lastName: {
                contains: term,
              },
            };
          }
          return {
            firstName: {
              contains: term,
            },
          };
        })
      );
      const [users, userCount] = await prisma.$transaction([
        prisma.user.findMany({
          where: {
            OR: [
              {
                AND: [
                  ...searchTermArray.map((term, index) => {
                    if (index > 0) {
                      return {
                        lastName: {
                          contains: term,
                        },
                      };
                    }
                    return {
                      firstName: {
                        contains: term,
                      },
                    };
                  }),
                ],
              },
              {
                AND: [
                  ...searchTermArray.map((term, index) => {
                    if (index > 0) {
                      return {
                        firstName: {
                          contains: term,
                        },
                      };
                    }
                    return {
                      lastName: {
                        contains: term,
                      },
                    };
                  }),
                ],
              },
              searchTermArray.length < 2
                ? {
                    username: {
                      contains: searchTermArray[0],
                    },
                  }
                : {},
            ],
          },
        }),
        prisma.user.count({
          where: {
            OR: [
              {
                AND: [
                  ...searchTermArray.map((term, index) => {
                    if (index > 0) {
                      return {
                        lastName: {
                          contains: term,
                        },
                      };
                    }
                    return {
                      firstName: {
                        contains: term,
                      },
                    };
                  }),
                ],
              },
              {
                AND: [
                  ...searchTermArray.map((term, index) => {
                    if (index > 0) {
                      return {
                        firstName: {
                          contains: term,
                        },
                      };
                    }
                    return {
                      lastName: {
                        contains: term,
                      },
                    };
                  }),
                ],
              },
              searchTermArray.length < 2
                ? {
                    username: {
                      contains: searchTermArray[0],
                    },
                  }
                : {},
            ],
          },
        }),
      ]);
      return {
        users: users,
        _count: userCount,
      };
    },
    userByEmail: async (_, { email }) => {
      return await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          followers: true,
          following: true,
        },
      });
    },
    user: async (_, { username, id }) => {
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
    },
    categories: async () => {
      return await prisma.category.findMany();
    },
    postLikedBy: async (_, { id }) => {
      const res = await prisma.post.findUnique({
        where: {
          id: id,
        },
        select: {
          likedBy: true,
        },
      });
      return res?.likedBy;
    },
    commentLikedBy: async (_, { id }) => {
      const res = await prisma.comment.findUnique({
        where: {
          id: id,
        },
        select: {
          likedBy: true,
        },
      });
      return res?.likedBy;
    },
    commentReplies: async (_, { id }) => {
      return await prisma.comment.findMany({
        where: {
          parentCommentId: id,
        },
        include: {
          author: true,
        },
      });
    },
  },
  // ----------------- Mutations ----------------- //
  Mutation: {
    // ---> USERS
    // TODO: User context instead
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
    updateUser: async (
      _,
      { firstName, lastName, username, imageUrl },
      { userEmail }
    ) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");
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
    },

    followUser: async (_, { userId }, { userEmail }) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");
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
    },
    unfollowUser: async (_, { userId }, { userEmail }) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");
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
    },
    // ---> POSTS
    createDraft: async (
      _,
      { slug, title, featuredImage, content, categories, tags, submitted },
      { userEmail }
    ) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");
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
          author: { connect: { email: userEmail } },
          submitted: submitted,
          published: false,
        },
      });
    },
    updatePost: async (
      _,
      { id, slug, title, featuredImage, content, categories, tags },
      { userEmail }
    ) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");
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
        include: {
          categories: true,
        },
      });
    },
    changePublished: async (_, { id, published }, { userEmail }) => {
      // TODO: check if user is admin
      if (!userEmail) throw new AuthenticationError("User must be logged in");
      return await prisma.post.update({
        where: {
          id,
        },
        data: {
          published,
        },
      });
    },
    changeSubmitted: async (_, { id, submitted }, { userEmail }) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");
      return await prisma.post.update({
        where: {
          id,
        },
        data: {
          submitted,
        },
      });
    },
    likePost: async (_, { id }, { userEmail }) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");
      const res = await prisma.post.update({
        where: {
          id,
        },
        include: {
          likedBy: true,
        },
        data: {
          likedBy: {
            connect: { email: userEmail },
          },
        },
      });
      return {
        id: res.id,
        likedBy: res.likedBy,
      };
    },
    unlikePost: async (_, { id }, { userEmail }) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");
      const res = await prisma.post.update({
        where: {
          id,
        },
        include: {
          likedBy: true,
        },
        data: {
          likedBy: {
            disconnect: { email: userEmail },
          },
        },
      });
      return {
        id: res.id,
        likedBy: res.likedBy,
      };
    },
    // ---> COMMENTS
    createComment: async (
      _,
      { content, postId, parentCommentId },
      { userEmail }
    ) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");

      let connectToParentComment: any = {};
      if (parentCommentId) {
        connectToParentComment = {
          parentComment: {
            connect: {
              id: parentCommentId,
            },
          },
        };
      }

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
          ...connectToParentComment,
        },
        include: {
          author: true,
          parentComment: {
            include: {
              parentComment: true,
            },
          },
        },
      });
    },
    deleteComment: async (_, { id }, { userEmail }) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");
      const res = await prisma.comment.findUnique({
        where: {
          id: 17,
        },
        select: {
          author: {
            select: {
              email: true,
              role: true,
            },
          },
        },
      });

      if (
        res &&
        res?.author.role !== "ADMIN" &&
        res?.author.email !== userEmail
      ) {
        throw new AuthenticationError(
          "Not authenticated to delete this comment"
        );
      }

      return await prisma.comment.delete({
        where: {
          id,
        },
      });
    },
    likeComment: async (_, { id }, { userEmail }) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");
      const res = await prisma.comment.update({
        where: {
          id: id,
        },
        data: {
          likedBy: {
            connect: {
              email: userEmail,
            },
          },
        },
        include: {
          likedBy: true,
        },
      });
      return {
        id: res.id,
        likedBy: res.likedBy,
      };
    },
    unlikeComment: async (_, { id }, { userEmail }) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");
      const res = await prisma.comment.update({
        where: {
          id: id,
        },
        data: {
          likedBy: {
            disconnect: {
              email: userEmail,
            },
          },
        },
        include: {
          likedBy: true,
        },
      });
      return {
        id: res.id,
        likedBy: res.likedBy,
      };
    },
    signUpload: async (_, { publicId, transforms }, { userEmail }) => {
      if (!userEmail) throw new AuthenticationError("User must be logged in");

      const timestamp = Math.round(new Date().getTime() / 1000);

      const signature = await cloudinary.utils.api_sign_request(
        {
          timestamp: timestamp,
          folder: "profile_pictures",
          eager: transforms,
          public_id: publicId,
        },
        process.env.CLOUDINARY_API_SECRET
      );

      return { timestamp, signature, transforms, publicId };
    },
  },
};
