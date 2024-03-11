import { Document } from 'mongoose';

export interface CommentInterface extends Document {
  comment: string;
  userId: string;
  postId: string;
}
