import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../controllers/categories/categoryController';
import { isAuthenticated } from '../../middlewares/isAuthenticated';
import { isAdmin } from '../../middlewares/isAdmin';

const router = express.Router();

const asyncHandler = (fn: any) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next);

// Público
router.get('/', asyncHandler(getAllCategories));
router.get('/:id', asyncHandler(getCategoryById));

// Solo admin
router.post('/', isAuthenticated, isAdmin, asyncHandler(createCategory));
router.put('/:id', isAuthenticated, isAdmin, asyncHandler(updateCategory));
router.delete('/:id', isAuthenticated, isAdmin, asyncHandler(deleteCategory));

export default router;
