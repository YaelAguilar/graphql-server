import { User, Post, Comment } from '../../../domain/models';
import { encryptPassword, comparePassword } from '../../../infrastructure/bcrypt/bcrypt';
import { createJWTToken } from '../../../infrastructure/auth/auth';
import { pubsub } from './suscriptionResolvers';
import { webhookService } from '../../../infrastructure/webhooks/webhookService';

export const mutationResolvers = {

  register: async (_:any, { username, email, password, displayName }) => {
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
  login: async (_:any, { email, password }) => {
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
  createPost: async (_:any, {title, body }, { verifiedUser }) => {
    if (!verifiedUser) throw new Error("You must be logged in to do that");

    const post = new Post({
      authorId: verifiedUser._id,
      title,
      body,
    });

    await post.save();

    webhookService.trigger('postCreated', {
      postId: post._id.toString(),
      title: post.title,
      body: post.body,
      authorId: post.authorId.toString(),
    });

    return post;
  },
  updatePost: async (_:any, { id, title, body }, { verifiedUser }) => {
    const postUpdated = await Post.findOneAndUpdate(
      { _id: id, authorId: verifiedUser._id },
      { title, body },
      { new: true, runValidators: true }
    );

    if (!postUpdated) throw new Error("No post for given id");
    return postUpdated;
  },
  deletePost: async (_:any, { postId }, { verifiedUser }) => {
    const postDeleted = await Post.findByIdAndDelete({
      _id: postId,
      authorId: verifiedUser._id,
    });

    if (!postDeleted) throw new Error("No post with given ID found for the author");
    return "Post deleted";
  },
  addComment: async (_:any, { postId, comment }, { verifiedUser }) => {
    const newComment = new Comment({
      userId: verifiedUser._id,
      postId,
      comment,
    });

    await newComment.save();
    
    //pubsub.publish('commentAdded', { commentAdded: newComment });
    pubsub.publish(`commentAdded:${postId}`, { commentAdded: newComment });

    return newComment;
  },
  updateComment: async (_:any, { id, comment }, { verifiedUser }) => {
    const commentUpdated = await Comment.findOneAndUpdate(
      { _id: id, userId: verifiedUser._id },
      { comment },
      { new: true, runValidators: true }
    );

    if (!commentUpdated) throw new Error("no comment with the given ID");
    return commentUpdated;
  },

  deleteComment: async (_:any, { id }, { verifiedUser }) => {
    const commentDelete = await Comment.findOneAndDelete({
      _id: id,
      userId: verifiedUser._id,
    });

    if (!commentDelete) throw new Error("No comment with the given ID for the user");
    return "comment deleted";
  }
};
