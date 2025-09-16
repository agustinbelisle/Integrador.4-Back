import { Request, Response } from 'express';
import * as userService from '../../services/users/userService';

export const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await userService.getAllUsers();
    const safeUsers = users.map(({ password, ...u }) => u);
    return res.json(safeUsers);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await userService.getUserById(+req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const { password, ...safeUser } = user;
    return res.json(safeUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userService.createUser({ name, email, password });
    const { password: _pw, ...safeUser } = newUser;
    return res.status(201).json({
      message: 'Usuario creado correctamente',
      user: safeUser
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear usuario', error });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const updated = await userService.updateUser(+req.params.id, req.body);
    const { password, ...safeUser } = updated;
    return res.json({
      message: 'Usuario actualizado correctamente',
      user: safeUser
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    await userService.deleteUser(+req.params.id);
    return res.status(200).json({ message: 'Usuario y sus órdenes eliminados correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
};

export const changeUserRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = +req.params.id;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Rol inválido. Debe ser "user" o "admin".' });
    }

    const updatedUser = await userService.updateUserRole(userId, role);
    const { password, ...safeUser } = updatedUser;
    return res.json({
      message: 'Rol del usuario actualizado correctamente',
      user: safeUser
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al cambiar el rol del usuario', error });
  }
};

