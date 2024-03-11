import { Schema, model, Document } from "mongoose";

interface IPost extends Document {
    authorId: String;
    title: String;
    body: String;
}

const postSchema = new Schema<IPost>(
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

const Post = model<IPost>("Post", postSchema);

export default Post;