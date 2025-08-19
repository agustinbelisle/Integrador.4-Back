// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { apiLimiter } from './middlewares/security/rateLimiter';
import { sanitizeInput } from './middlewares/security/sanitize';
import { errorHandler } from './middlewares/security/handleErrors';
import routes from './routes/index';
import path from 'path';

const app = express();
app.set("trust proxy", true); // 👈 Esto habilita el uso de X-Forwarded-For


// Parsear JSON
app.use(express.json());

// Seguridad y CORS
app.use(
  cors({
    
origin: (origin, callback) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'https://integrador-4-front.vercel.app'
  ];
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
  } else {
    console.warn(`Origen bloqueado por CORS: ${origin}`);
    callback(new Error('No permitido por CORS')); // 👈 lanza error visible
  }
},
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Helmet para imágenes cross-origin
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(sanitizeInput);

// Limitador de peticiones para todas las rutas /api
app.use('/api', apiLimiter);


// Ruta raíz
app.get('/', (_req, res) => {
  res.json({ message: 'API funcionando 🚀' });
});

// Monta todas las rutas internas bajo /api
app.use('/api', routes);

// Servir imágenes estáticas
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

// Manejador global de errores
app.use(errorHandler);

export default app;
