import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const subscriptionResolvers = {
  commentAdded: {
    subscribe: (_, { postId }) => pubsub.asyncIterator(`commentAdded:${postId}`)
  },
};
