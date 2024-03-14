import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { typeDefs } from './src/adapters/graphql/schema';
import { resolvers } from './src/adapters/graphql/resolvers';
import connectDB from './src/infrastructure/database';

config();

const verifyToken = (token: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const verifiedPayload = token ? verifyToken(token) : null;
    return { verifiedUser: verifiedPayload ? verifiedPayload.user : null };
  },
});

const startServer = async () => {
  await connectDB();
  const { url } = await server.listen({ port: 4000 });
  console.log(`🚀 Server ready at: ${url}`);
};

startServer();
