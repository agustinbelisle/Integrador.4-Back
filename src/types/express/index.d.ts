// src/types/express/index.d.ts
declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      role: string;
      email: string; // ← Añadido para poder enviar correos
    };
  }
}
