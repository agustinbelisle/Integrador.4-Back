import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  requireTLS: true,
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify()
  .then(() => console.log('✅ Nodemailer conectado correctamente'))
  .catch((err) => console.error('❌ Error de conexión Nodemailer:', err));

export default transporter;

