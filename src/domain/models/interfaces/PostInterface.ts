import { Document } from 'mongoose';

export interface PostInterface extends Document {
  authorId: string;
  title: string;
  body: string;
}
