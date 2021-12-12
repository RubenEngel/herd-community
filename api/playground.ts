import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["info"],
});

// const mutation = async () => {
//   const postData = await prisma.post.findMany({
//     select: { id: true, authorEmail: true },
//   });
//   postData.forEach(async (post) => {
//     if (!post.authorEmail) return;
//     try {
//       await prisma.post.update({
//         where: {
//           id: post.id,
//         },
//         data: {
//           author: {
//             connectOrCreate: {
//               where: { email: post.authorEmail || undefined },
//               create: { email: post.authorEmail },
//             },
//           },
//         },
//       });
//       console.log("Post ID " + post.id + " done ✅");
//     } catch (error) {
//       console.log("Post ID " + post.id + " failed ❌");
//       console.log("error code: " + error);
//     }
//   });
// };

// mutation();

const resp = async () => {
  const res = await prisma.post.findUnique({
    where: {
      id: 2104,
    },
    select: {
      likedBy: true,
    },
  });
  return res;
};

console.log(resp());
