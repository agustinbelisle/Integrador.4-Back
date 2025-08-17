// src/controllers/auth/authController.ts
import { Request, Response } from 'express';
import * as authService from '../../services/auth/authService';
import generateToken from '../../utils/generateToken';
import { sendRegistrationEmail } from '../../services/emailService';

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    const user = await authService.register(name, email, password);
    const token = generateToken({ id: user.id, role: user.role, email: user.email });

    // Enviar email de bienvenida (no bloquea respuesta)
    sendRegistrationEmail(email, name).catch((err) => {
      console.error('Error al enviar email de registro:', err.message);
    });

    return res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return res.status(400).json({ message });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await authService.login(email, password);
    const token = generateToken({ id: user.id, role: user.role, email: user.email });

    return res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return res.status(400).json({ message });
  }
};
