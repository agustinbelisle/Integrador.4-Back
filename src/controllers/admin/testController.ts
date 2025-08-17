import { Request, Response } from 'express';

export const adminTest = (_req: Request, res: Response): Response => {
  return res.json({ message: 'Acceso autorizado. Usuario es administrador ✅' });
};
