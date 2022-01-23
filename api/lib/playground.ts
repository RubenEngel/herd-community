import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["info"],
});

async function fn() {
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

  console.log(res?.author.email);
}

fn();
