import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máx. 100 peticiones por IP
  message: 'Demasiadas solicitudes, intenta nuevamente en 15 minutos.',
});

export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 5, // máx. 5 intentos de login
  message: 'Demasiados intentos de inicio de sesión, intenta más tarde.',
});
