import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Error interno del servidor',
    code: err.code || undefined,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
};
