import { Schema, model } from 'mongoose';
import { CommentInterface } from './interfaces/CommentInterface';

const commentSchema = new Schema<CommentInterface>(
  {
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model<CommentInterface>('Comment', commentSchema);

export { Comment };
