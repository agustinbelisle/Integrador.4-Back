// src/routes/payments/paymentRoutes.ts
import express from 'express';
import { payOrder } from '../../controllers/payments/paymentController';
import { isAuthenticated } from '../../middlewares/isAuthenticated';

const router = express.Router();

// Helper to wrap async route handlers and forward errors to Express error handler
const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/:orderId', isAuthenticated, asyncHandler(payOrder));

export default router;
