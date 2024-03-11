import { Schema, model, Document } from 'mongoose';

interface IComment extends Document {
  comment: string;
  userId: string;
  postId: string;
}

const comment = new Schema<IComment>(
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

const Comment = model<IComment>('Comment', comment);

export { Comment };
