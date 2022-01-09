import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["info"],
});

async function fn() {
  const res = await prisma.post.findMany({
    where: {
      likedBy: {
        some: {
          username: "ruben.engel",
        },
      },
    },
  });
  console.log(res);
}

fn();
