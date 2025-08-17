import { Request, Response } from "express";
import { sendContactEmail } from "../../services/contact/contactService";

export const handleContactForm = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios." });
  }

  try {
    await sendContactEmail(name, email, message);
    return res
      .status(200)
      .json({ message: "Mensaje enviado y guardado correctamente." });
  } catch (error) {
    console.error("Error al enviar el correo de contacto:", error);
    return res.status(500).json({ error: "Error al enviar el mensaje." });
  }
};
