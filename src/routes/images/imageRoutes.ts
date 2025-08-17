import express, { Request, Response, NextFunction } from 'express';
import {
  addImage,
  getImagesByProduct,
  deleteImage
} from '../../controllers/images/imageController';
import { isAuthenticated } from '../../middlewares/isAuthenticated';
// Opcional, si querés que solo admins puedan eliminar/crear imágenes:
// import { isAdmin } from '../../middlewares/isAdmin';

const router = express.Router();

const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/', isAuthenticated, asyncHandler(addImage)); 
router.get('/product/:productId', asyncHandler(getImagesByProduct));
router.delete('/:id', isAuthenticated, asyncHandler(deleteImage));

export default router;
