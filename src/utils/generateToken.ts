// src/utils/generateToken.ts
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  role: string;
  email: string;
}

const generateToken = ({ id, role, email }: TokenPayload): string => {
  return jwt.sign({ id, role, email }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

export default generateToken;

