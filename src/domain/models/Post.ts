import { Schema, model } from 'mongoose';
import { PostInterface } from './interfaces/PostInterface';

const postSchema = new Schema<PostInterface>(
  {
    authorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = model<PostInterface>('Post', postSchema);

export { Post };
