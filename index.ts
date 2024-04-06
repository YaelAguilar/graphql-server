import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { typeDefs } from './src/adapters/graphql/schema';
import { resolvers } from './src/adapters/graphql/resolvers';
import connectDB from './src/infrastructure/database';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { webhookService } from './src/infrastructure/webhooks/webhookService';

config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (token: string) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env file");
  }
  try {
    return jwt.verify(token, JWT_SECRET) as { user: any };
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return null;
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(express.json());
const httpServer = http.createServer(app);

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const verifiedPayload = token ? verifyToken(token) : null;
    return { verifiedUser: verifiedPayload ? verifiedPayload.user : null };
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  useServer({ schema }, wsServer);

  app.post('/webhook', (req, res) => {
    const { event, url } = req.body;
    webhookService.register(event, url);
    res.json({ message: 'Webhook registrado exitosamente' });
  });

  httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:4000/graphql`);
  });
});

connectDB();
