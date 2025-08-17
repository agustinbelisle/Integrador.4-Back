import { Request, Response, NextFunction } from 'express';

const sanitize = (value: any): any => {
  if (typeof value === 'string') {
    return value.replace(/<.*?>/g, ''); // elimina etiquetas HTML
  } else if (typeof value === 'object' && value !== null) {
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        value[key] = sanitize(value[key]);
      }
    }
  }
  return value;
};

export const sanitizeInput = (req: Request, _res: Response, next: NextFunction) => {
  req.body = sanitize(req.body);
  req.params = sanitize(req.params);

  if (typeof req.query === 'object' && req.query !== null) {
    for (const key in req.query) {
      const val = req.query[key];
      if (typeof val === 'string') {
        req.query[key] = val.replace(/<.*?>/g, '');
      }
    }
  }

  next();
};
