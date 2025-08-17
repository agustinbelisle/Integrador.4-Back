import { Router } from 'express';

import userRoutes from './users/userRoutes';
import authRoutes from './auth/authRoutes';
import categoryRoutes from './categories/categoryRoutes';
import productRoutes from './products/productRoutes';
import cartRoutes from './cart/cartRoutes';
import orderRoutes from './orders/orderRoutes';
import adminRoutes from './admin/adminRoutes';
import paymentRoutes from './payments/paymentRoutes';
import devRoutes from './dev/devRoutes';
import imageRoutes from './images/imageRoutes';

// Importa el router de contacto
import contactRoutes from './contact/contactRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/admin', adminRoutes);
router.use('/payments', paymentRoutes); // <- plural para coincidir con frontend
router.use('/dev', devRoutes);
router.use('/images', imageRoutes);

// Agrega la ruta de contacto
router.use('/contact', contactRoutes);

export default router;
