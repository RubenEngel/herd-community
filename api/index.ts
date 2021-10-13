import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  app.use("*", cors());
  app.use(helmet());
  app.use(compression());
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });

  const PORT = process.env.PORT || 4000;
  httpServer.listen({ port: PORT }, (): void => {
    if (PORT !== process.env.PORT)
      console.log(`🚀 GraphQL-Server is running on http://localhost:${PORT}/"`);
    else console.log(`🚀 GraphQL-Server is running`);
  });
}

startApolloServer(typeDefs, resolvers);
