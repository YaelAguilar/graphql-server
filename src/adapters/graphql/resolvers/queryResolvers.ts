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
  getAllPosts: async (_:any, { limit, offset }) => {
    try {
      const posts = await Post.find().limit(limit).skip(offset);
      const totalCount = await Post.countDocuments();
      return { posts, totalCount };
      /*const posts = await Post.find();
      return posts || [];*/
    } catch (error) {
      console.error("Error fetching posts:", error);
      return { posts: [], totalCount: 0 };
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
  getAllComments: async (_:any, {limit, offset} ) => {
    try {
      /*const comments = await Comment.find();
      return comments || [];*/
      const comments = await Comment.find().limit(limit).skip(offset);
      const totalCount = await Comment.countDocuments();
      return { comments, totalCount };
    } catch (error) {
      console.error("Error fetching comments:", error);
      return { comments: [], totalCount: 0 };
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
