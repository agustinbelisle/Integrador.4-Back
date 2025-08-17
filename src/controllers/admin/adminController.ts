import { Request, Response } from 'express';
import prisma from '../../config/prisma';

export const getDashboardStats = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [totalUsers, totalProducts, totalOrders, totalRevenue] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } })
    ]);

    return res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener estadísticas', error });
  }
};
