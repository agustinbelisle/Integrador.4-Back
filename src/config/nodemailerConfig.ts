import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  requireTLS: true, // 👈 Asegura conexión segura con STARTTLS
  tls: {
    rejectUnauthorized: false, // Solo en desarrollo
  },
});

transporter.verify()
  .then(() => console.log('✅ Nodemailer conectado correctamente'))
  .catch((err) => console.error('❌ Error de conexión Nodemailer:', err));

export default transporter;
