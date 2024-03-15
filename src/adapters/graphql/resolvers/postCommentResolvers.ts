import { User, Post, Comment } from '../../../domain/models';

export const postResolvers = {
  author: async (parent: { authorId: string }) => {
    try {
      const user = await User.findById(parent.authorId);
      return user || null;
    } catch (error) {
      console.error("Error fetching author for post:", error);
      return null;
    }
  },
  comments: async (parent) => {
    try {
      const comments = await Comment.find({ postId: parent.id });
      return comments || [];
    } catch (error) {
      console.error("Error fetching comments for post:", error);
      return [];
    }
  },
};

export const commentResolvers = {
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
};
