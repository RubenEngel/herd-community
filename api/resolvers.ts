import { ApolloError } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import { GraphQLScalarType } from "graphql";
// import cloudinary from "cloudinary/lib/v2";
// import { GraphQLUpload } from "graphql-upload";
// import { finished } from "stream/promises";
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

const prisma = new PrismaClient({
  log: ["info"],
});

// const checkAuth = async (userEmail: string) => {
//   const user = await prisma.user.findUnique({ where: { email: userEmail } });
//   if (user) {
//     return true;
//   } else {
//     return false;
//   }
// };

// const signUploadForm = () => {
//   const timestamp = Math.round(new Date().getTime() / 1000);

//   const signature = cloudinary.utils.api_sign_request(
//     {
//       timestamp: timestamp,
//       folder: "profile_pictures",
//     },
//     process.env.CLOUDINARY_API_SECRET
//   );

//   return { timestamp, signature };
// };

export const resolvers = {
  DateTime: dateScalar,
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  // Upload: GraphQLUpload,
  Query: {
    posts: async (
      _,
      { published, category, limit, startAfter },
      { userEmail }
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
    userByEmail: async (_, { email }) => {
      return prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    },
    userByUsername: async (_, { username }) => {
      return prisma.user.findUnique({
        where: {
          username: username,
        },
        include: {
          posts: true,
          followers: true,
          following: true,
          likedPosts: true,
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
      { slug, title, featuredImage, content, categories, tags, authorEmail }
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
            published: true,
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
    // uploadProfileImage: async (_, { userId, image }, context) => {
    //   cloudinary.config({
    //     cloud_name: "dnsihvop5",
    //     api_key: "798653816451577",
    //     api_secret: "Yf8P5UJOvBbRi4vgO4z0j1PHslU",
    //   });
    //   try {
    //     const result = await cloudinary.v2.uploader.upload(image, {
    //       //here i chose to allow only jpg and png upload
    //       allowed_formats: ["jpg", "png"],
    //       //generates a new id for each uploaded image
    //       public_id: "",
    //       /*creates a folder called "your_folder_name" where images will be stored.
    //        */
    //       folder: "herd",
    //     });
    //     console.log(result);
    //     return prisma.user.update({
    //       where: { id: userId },
    //       data: { imageUrl: result.url },
    //     });
    //   } catch (e) {
    //     return console.log("Couldn't upload image");
    //   }
    // },
    // singleUpload: async (_, { file }) => {
    //   const { createReadStream, filename, mimetype, encoding } = await file;

    //   // Invoking the `createReadStream` will return a Readable Stream.
    //   // See https://nodejs.org/api/stream.html#stream_readable_streams
    //   const stream = createReadStream();

    //   // This is purely for demonstration purposes and will overwrite the
    //   // local-file-output.txt in the current working directory on EACH upload.
    //   const out = require("fs").createWriteStream("local-file-output.txt");
    //   stream.pipe(out);
    //   await finished(out);

    //   return { filename, mimetype, encoding };
    // },
  },
};
