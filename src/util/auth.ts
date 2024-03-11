import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const createJWTToken = (user: any) => {
  return jwt.sign({ user }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export { createJWTToken };
