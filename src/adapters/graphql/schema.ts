import { gql } from 'apollo-server';
import { User, Post, Comment } from '../../domain/models'
import { encryptPassword, comparePassword } from '../../infrastructure/bcrypt/bcrypt'
import { createJWTToken } from '../../infrastructure/auth/auth'

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

  type Mutation {
    register(username: String!, email: String!, password: String!, displayName: String!): String
    login(email: String!, password: String!): String
  }
`;

export const resolvers = {
  Query: {
    //Query (1)
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users || [];
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    },
    //Query (2)
    getUserById: async (_: any, { id }: { id: string }) => {
      try {
        const user = await User.findById(id);
        return user || null;
      } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
      }
    },
    //Query (3)
    getAllPosts: async () => {
      try {
        const posts = await Post.find();
        return posts || [];
      } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
      }
    },
    //Query (4)
    getPostById: async (_: any, { id }: { id: string }) => {
      try {
        const post = await Post.findById(id);
        return post || null;
      } catch (error) {
        console.error("Error fetching post by ID:", error);
        return null;
      }
    },
    //Query (5)
    getAllComments: async () => {
      try {
        const comments = await Comment.find();
        return comments || [];
      } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
      }
    },
    //Query (6)
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
  Mutation: {
    //Mutacion (0.1) register 
    register: async (_, { username, email, password, displayName }) => {
      const user = new User({ username, email, password, displayName });
      user.password = await encryptPassword(user.password);
      await user.save();

      const token = createJWTToken({
        _id: user._id,
        email: user.email,
        displayName: user.displayName,
      });
      return token;
    },
    //Mutacion (0.2) ogin
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email }).select("+password");

      if (!user) throw new Error("Invalid Username");

      const validPassword = await comparePassword(password, user.password);

      if (!validPassword) throw new Error("Invalid Password");

      const token = createJWTToken({
        _id: user._id,
        email: user.email,
        displayName: user.displayName,
      });

      return token;
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
