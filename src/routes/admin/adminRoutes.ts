import express from 'express';
import { getDashboardStats } from '../../controllers/admin/adminController';
import { isAuthenticated } from '../../middlewares/isAuthenticated';
import { isAdmin } from '../../middlewares/isAdmin';

const router = express.Router();

router.get('/stats', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
	await getDashboardStats(req, res);
  } catch (err) {
	next(err);
  }
});

export default router;
