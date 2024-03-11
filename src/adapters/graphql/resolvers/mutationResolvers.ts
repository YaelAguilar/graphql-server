import { User } from '../../../domain/models';
import { encryptPassword, comparePassword } from '../../../infrastructure/bcrypt/bcrypt';
import { createJWTToken } from '../../../infrastructure/auth/auth';

export const mutationResolvers = {
  register: async (_, { username, email, password, displayName }) => {
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
  login: async (_, { email, password }) => {
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
};
