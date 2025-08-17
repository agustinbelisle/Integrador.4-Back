// src/routes/orders/orderRoutes.ts
import express from 'express';
import {
  createOrder,
  getOrders,
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

// 👉 Crear orden (solo usuario autenticado)
router.post('/:userId', isAuthenticated, asyncHandler(createOrder));

// 👉 Obtener órdenes de un usuario (usuario autenticado)
router.get('/user/:userId', isAuthenticated, asyncHandler(getOrders));

// 👉 Obtener orden por ID (usuario autenticado)
router.get('/:id', isAuthenticated, asyncHandler(getOrder));

// 👉 Actualizar estado de orden (solo admin)
router.put('/:id', isAuthenticated, isAdmin, asyncHandler(updateOrderStatus));

// DELETE orden: restringido para admin
router.delete('/:id', isAuthenticated, isAdmin, asyncHandler(deleteOrder));

export default router;
