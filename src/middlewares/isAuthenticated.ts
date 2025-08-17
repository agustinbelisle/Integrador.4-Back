// src/middlewares/isAuthenticated.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token no proporcionado' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id?: number;
      userId?: number;
      role: string;
      email: string;
    };

    const userId = decoded.id ?? decoded.userId;
    if (!userId || !decoded.role || !decoded.email) {
      res.status(401).json({ message: 'Token inválido o incompleto' });
      return;
    }

    req.user = {
      id: userId,
      role: decoded.role,
      email: decoded.email, // ← ahora disponible en req.user.email
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
