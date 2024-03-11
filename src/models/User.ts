import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  displayName: string;
}

const user = new Schema<IUser>(
  {
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Provide a valid email',
    ],
  },
  displayName: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
  timestamps: true,
  }
);

const User = model<IUser>('User', user);

export { User };
