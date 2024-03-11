import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { typeDefs } from './src/adapters/graphql/schema';
import { resolvers } from './src/adapters/graphql/resolvers'
import connectDB from './src/infrastructure/database';

config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await connectDB();

  const { url } = await server.listen({ port: 4000 });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
