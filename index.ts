import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { typeDefs, resolvers } from './src/schema';
import connectDB from './src/db';

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
