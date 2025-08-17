import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../controllers/products/productController';
import { isAuthenticated } from '../../middlewares/isAuthenticated';
import { isAdmin } from '../../middlewares/isAdmin';

const router = express.Router();

const asyncHandler = (fn: any) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next);

// Público
router.get('/', asyncHandler(getAllProducts));
router.get('/:id', asyncHandler(getProductById));

// Solo admins
router.post('/', isAuthenticated, isAdmin, asyncHandler(createProduct));
router.put('/:id', isAuthenticated, isAdmin, asyncHandler(updateProduct));
router.delete('/:id', isAuthenticated, isAdmin, asyncHandler(deleteProduct));

export default router;
