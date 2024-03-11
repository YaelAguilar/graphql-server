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
    comments: [Comment!]!
  }

  type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User
    getAllPosts: [Post!]!
    getPostById(id: ID!): Post
    getAllComments: [Comment!]!
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
    getUserById: async (_: any, { id }: { id: string }) => {
      try {
        const user = await User.findById(id);
        return user || null;
      } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
      }
    },
    getAllPosts: async () => {
      try {
        const posts = await Post.find();
        return posts || [];
      } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
      }
    },
    getPostById: async (_: any, { id }: { id: string }) => {
      try {
        const post = await Post.findById(id);
        return post || null;
      } catch (error) {
        console.error("Error fetching post by ID:", error);
        return null;
      }
    },
    getAllComments: async () => {
      try {
        const comments = await Comment.find();
        return comments || [];
      } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
      }
    },
    getCommentById: async (_: any, { id }: { id: string }) => {
      try {
        const comment = await Comment.findById(id);
        return comment || null;
      } catch (error) {
        console.error("Error fetching comment by ID:", error);
        return null;
      }
    },
  },
  Post: {
    author: async (parent: { authorId: string }) => {
      try {
        const user = await User.findById(parent.authorId);
        return user || null;
      } catch (error) {
        console.error("Error fetching author for post:", error);
        return null;
      }
    },
    comments: async (parent: { id: string }) => {
      try {
        const comments = await Comment.find({ postId: parent.id });
        return comments || [];
      } catch (error) {
        console.error("Error fetching comments for post:", error);
        return [];
      }
    },
  },
  Comment: {
    user: async (parent: { userId: string }) => {
      try {
        const user = await User.findById(parent.userId);
        return user || null;
      } catch (error) {
        console.error("Error fetching user for comment:", error);
        return null;
      }
    },
    post: async (parent: { postId: string }) => {
      try {
        const post = await Post.findById(parent.postId);
        return post || null;
      } catch (error) {
        console.error("Error fetching post for comment:", error);
        return null;
      }
    },
  },
};

export default resolvers;
