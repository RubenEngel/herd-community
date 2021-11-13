import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["info"],
});

const test = async () => {
  const postData = await prisma.post.findMany({
    select: { id: true, authorEmail: true },
  });
  postData.forEach(async (post) => {
    await prisma.post.update({
      where: {
        id: post.id
      },
      data: {
        authorEmail: post.authorEmail.toLowerCase(),
      },
    })
    console.log('Post ID ' + post.id + ' done ✅')
  })
};

test();
