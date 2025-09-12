import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../../controllers/cart/cartController';
import { isAuthenticated } from '../../middlewares/isAuthenticated';

const router = express.Router();

const asyncHandler = (fn: any) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next);

// Todas las rutas del carrito deben estar protegidas
router.get('/:userId', isAuthenticated, asyncHandler(getCart));
router.post('/:userId', isAuthenticated, asyncHandler(addToCart));
router.put('/:userId/item/:itemId', isAuthenticated, asyncHandler(updateCartItem));
router.delete('/item/:itemId', isAuthenticated, asyncHandler(removeFromCart));
router.delete('/clear/:userId', isAuthenticated, asyncHandler(clearCart));

export default router;
