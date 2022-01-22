import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import compression from "compression";
import cors from "cors";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(cors());
  app.use(compression());
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const accessToken = req.headers.authorization?.split(" ")[1];

      let user;

      if (accessToken) {
        try {
          user = jwt.verify(
            accessToken,
            process.env.SUPABASE_JWT_SECRET as string
          );
        } catch (err) {
          console.error(err);
        }
      }

      // Add the user email to the context
      return { userEmail: user?.email };
    },
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });

  const PORT = process.env.PORT || 4000;
  httpServer.listen({ port: PORT }, () => {
    if (PORT !== process.env.PORT)
      console.log(
        `\n🚀 GraphQL-Server is running on http://localhost:${PORT}/\n`
      );
    else console.log(`\n🚀 GraphQL-Server is running\n`);
  });
}

startApolloServer(typeDefs, resolvers);
