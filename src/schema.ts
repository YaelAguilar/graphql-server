import { gql } from 'apollo-server';
import Post from './models/Post';
import User from './models/User';
import Comment from './models/Comment';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    displayName: String!
  }

  type Comment {
    id: ID!
    comment: String!
    user: User!
    post: Post!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    author: User!
    comments: [Comment]!
  }

  type Query {
    getAllUsers: [User]!
    getUserById(id: ID!): User
    getAllPosts: [Post]!
    getPostById(id: ID!): Post
    getAllComments: [Comment]!
    getCommentById(id: ID!): Comment
  }
`;

export const resolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users || [];
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    },
  },
  Post: {
    author: async (parent: { authorId: string }) => {
      return User.findById(parent.authorId);
    },
    comments: async (parent: { id: string }) => {
      return Comment.find({ postId: parent.id });
    },
  },
  Comment: {
    user: async (parent: { userId: string }) => {
      return User.findById(parent.userId);
    },
    post: async (parent: { postId: string }) => {
      return Post.findById(parent.postId);
    },
  },
};

export default resolvers;

