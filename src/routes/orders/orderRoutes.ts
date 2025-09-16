import express from 'express';
import {
  createOrder,
  getOrders,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder
} from '../../controllers/orders/orderController';
import { isAuthenticated } from '../../middlewares/isAuthenticated';
import { isAdmin } from '../../middlewares/isAdmin';

const router = express.Router();

const asyncHandler = (fn: any) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next);

// Crear orden (solo usuario autenticado)
router.post('/:userId', isAuthenticated, asyncHandler(createOrder));

// Obtener órdenes de un usuario
router.get('/user/:userId', isAuthenticated, asyncHandler(getOrders));

// Obtener todas las órdenes (admin)
router.get('/', isAuthenticated, isAdmin, asyncHandler(getAllOrders));

// Obtener orden por ID
router.get('/:id', isAuthenticated, asyncHandler(getOrder));

// Actualizar estado de orden (admin)
router.put('/:id', isAuthenticated, isAdmin, asyncHandler(updateOrderStatus));

// Eliminar orden (admin)
router.delete('/:id', isAuthenticated, isAdmin, asyncHandler(deleteOrder));

export default router;
