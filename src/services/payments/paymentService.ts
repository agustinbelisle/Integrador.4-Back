// src/services/payments/paymentService.ts
import prisma from '../../config/prisma';

export const processPayment = async (
  orderId: number,
  method: string
) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });

  if (!order) throw new Error('Orden no encontrada');
  if (order.status === 'pagado') throw new Error('La orden ya fue pagada');

  const payment = await prisma.payment.create({
    data: {
      orderId,
      method,
      amount: order.total
    }
  });

  await prisma.order.update({
    where: { id: orderId },
    data: { status: 'pagado' }
  });

  return payment;
};
