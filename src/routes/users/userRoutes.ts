import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeUserRole
} from '../../controllers/users/userController';

import { isAuthenticated } from '../../middlewares/isAuthenticated';
import { isAdmin } from '../../middlewares/isAdmin';

const router = express.Router();

const asyncHandler = (fn: any) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next);

// Solo admin
router.get('/', isAuthenticated, isAdmin, asyncHandler(getAllUsers));

// Autenticado, idealmente validar que solo puede ver su propio perfil o admin
router.get('/:id', isAuthenticated, asyncHandler(getUserById));

// Registro público
router.post('/', asyncHandler(createUser));

// Actualizar: autenticado, idealmente validar que solo actualice su perfil o admin
router.put('/:id', isAuthenticated, asyncHandler(updateUser));

// Borrar: solo admin
router.delete('/:id', isAuthenticated, isAdmin, asyncHandler(deleteUser));

// Cambiar rol: solo admin
router.put('/:id/role', isAuthenticated, isAdmin, asyncHandler(changeUserRole));

export default router;
