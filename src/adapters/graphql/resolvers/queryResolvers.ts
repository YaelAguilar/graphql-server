import { User, Post, Comment } from '../../../domain/models';

export const queryResolvers = {
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
};
