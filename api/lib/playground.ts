import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["info"],
});

(async () => {
  const getRes = await prisma.post.findMany({
    select: {
      id: true,
      featuredImage: true,
    },
  });

  let successful = 0;

  getRes.forEach(async (post, index) => {
    if (!post.featuredImage?.includes("q_auto")) {
      const newUrl = post.featuredImage?.replace(
        "upload/",
        "upload/q_auto,f_auto/c_limit,w_1200,h_1200/"
      );
      try {
        const mutRes = await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            featuredImage: newUrl,
          },
        });
        if (mutRes) {
          successful += 1;
          console.log("✅ ", mutRes.featuredImage);
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  console.log(successful / getRes.length, " updates succesful");
})();
