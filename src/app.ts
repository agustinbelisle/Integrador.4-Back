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
app.set("trust proxy", true); // 👈 Habilita X-Forwarded-For en Render

// Parsear JSON
app.use(express.json());

// --- Seguridad y CORS ---
const allowedOrigins = [
  'http://localhost:5173',
  /\.vercel\.app$/, // permite cualquier subdominio de Vercel
  'https://integrador-4-front.vercel.app'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.some((o) =>
          typeof o === 'string' ? o === origin : o.test(origin)
        )
      ) {
        callback(null, true);
      } else {
        console.warn(`Origen bloqueado por CORS: ${origin}`);
        callback(new Error('No permitido por CORS'));
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

// Sanitizar inputs
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
