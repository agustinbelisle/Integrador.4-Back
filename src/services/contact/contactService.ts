import nodemailer from "nodemailer";
import prisma from "../../config/prisma";
import dotenv from "dotenv";
dotenv.config();

export const sendContactEmail = async (
  name: string,
  email: string,
  message: string
) => {
  try {

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


const mailOptions = {

  from: `"Mi Tienda" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_TO || process.env.MAILTRAP_USER,
  replyTo: `${name} <${email}>`,
  subject: "Nuevo mensaje de contacto",
  html: `
    <h3>Nuevo mensaje recibido desde el formulario</h3>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mensaje:</strong><br/>${message}</p>
  `,
};



    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado:", info.messageId);

    await prisma.contactMessage.create({
      data: { name, email, message },
    });
  } catch (error) {
    console.error("Error al enviar el email de contacto:", error);
    throw new Error("No se pudo enviar el email");
  }
};
