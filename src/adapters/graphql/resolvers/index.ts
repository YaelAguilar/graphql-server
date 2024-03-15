import { queryResolvers } from './queryResolvers';
import { mutationResolvers } from './mutationResolvers';
import { subscriptionResolvers } from './suscriptionResolvers';
import { postResolvers, commentResolvers } from './postCommentResolvers';

export const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Post: postResolvers,
  Comment: commentResolvers,
  Subscription: subscriptionResolvers,
};
