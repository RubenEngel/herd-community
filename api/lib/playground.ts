import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["info"],
});

const updateUserNames = async () => {
  const users = await prisma.user.findMany({
    select: { firstName: true, lastName: true, id: true },
  });
  console.log("got user data");
  users.forEach(async (user) => {
    try {
      console.log("trying");
      const newUserData = await prisma.user.update({
        where: { id: user.id },
        data: {
          username: `${user.firstName}${
            user.lastName ? "." + user.lastName : ""
          }`,
        },
      });
      console.log(`New username is: ${newUserData.username}`);
    } catch (e) {
      console.log(e);
    }
  });
};

updateUserNames();
