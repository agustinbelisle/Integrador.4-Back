import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
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
