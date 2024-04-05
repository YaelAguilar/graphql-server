import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const subscriptionResolvers = {
  commentAdded: {
    subscribe: (_: any, { postId }: any) => pubsub.asyncIterator(`commentAdded:${postId}`)
  },
};
