import { queryResolvers } from './queryResolvers';
import { mutationResolvers } from './mutationResolvers';
import { postResolvers, commentResolvers } from './postCommentResolvers';

export const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Post: postResolvers,
  Comment: commentResolvers,
};
