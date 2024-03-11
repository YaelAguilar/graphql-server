// User.ts
import { Schema, model } from 'mongoose';
import { UserInterface } from './interfaces/UserInterface';

const userSchema = new Schema<UserInterface>(
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model<UserInterface>('User', userSchema);

export { User };
