import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["info"],
});

const getExcerpt = (content: string) => {
  const paragraphRegex = /<p(.*?)>(.*?)<\/p>/g;
  const matches = content.match(paragraphRegex);
  if (!matches) return;
  for (let exceprtIndex = 0; exceprtIndex < matches.length; exceprtIndex++) {
    const exceprtParagraph = matches[exceprtIndex];
    // a length that is too short for a good excerpt
    if (exceprtParagraph.length < 200) {
      console.log("🤬 failed: ", exceprtParagraph);
      continue;
    } else {
      console.log("👾 success: ", exceprtParagraph);
      return matches[exceprtIndex];
    }
  }
};

const updateExcerpt = async () => {
  const posts = await prisma.post.findMany();
  posts.forEach(async (post) => {
    const content = post.content;
    const res = await prisma.post.update({
      where: { id: post.id },
      data: { excerpt: getExcerpt(content) },
    });
  });
};

updateExcerpt();
