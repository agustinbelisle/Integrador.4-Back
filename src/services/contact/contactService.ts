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
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      requireTLS: true, // Asegura conexión segura
    });

    const mailOptions = {
      from: `"Mi Tienda" <${process.env.EMAIL_USER}>`, // Evita bloqueos por Gmail
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Donde recibís el mensaje
      replyTo: `${name} <${email}>`, // Permite responder al usuario
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
