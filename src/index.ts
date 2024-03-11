import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { typeDefs, resolvers } from './schema';
import connectDB from './db';

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
