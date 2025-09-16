import transporter from '../config/nodemailerConfig';
import {
  registrationEmailTemplate,
  orderEmailTemplate,
} from '../utils/emailTemplates';

export const sendRegistrationEmail = async (to: string, name: string): Promise<void> => {
  if (!to || !name) return;

  const mailOptions = {
    from: `"Mi Tienda" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Bienvenido a Mi Tienda',
    html: registrationEmailTemplate(name),
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error enviando email de registro a ${to}:`, error);
  }
};

export const sendOrderConfirmationEmail = async (
  to: string,
  orderId: number,
  total: number,
  items: any[] 
): Promise<void> => {
  if (!to || !orderId || !total || !items) return;

  const mailOptions = {
    from: `"Mi Tienda" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Confirmación de tu pedido',
    html: orderEmailTemplate(orderId, total, items),
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error enviando email de pedido a ${to}:`, error);
  }
};
