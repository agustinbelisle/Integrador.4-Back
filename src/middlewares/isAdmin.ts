// src/middlewares/isAdmin.ts
import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ message: 'Acceso denegado: se requiere rol de administrador' });
    return;
  }

  next(); 
};
