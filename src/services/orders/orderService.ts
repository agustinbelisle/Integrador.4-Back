import prisma from '../../config/prisma';

export const createOrderFromCart = async (userId: number) => {
  return await prisma.$transaction(async (tx) => {
    const cartItems = await tx.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      throw new Error('El carrito está vacío');
    }

    let total = 0;
    const orderItemsData = cartItems.map((item) => {
      const price = item.product?.price;
      if (price === undefined) {
        throw new Error(`Producto con ID ${item.productId} sin precio`);
      }
      total += price * item.quantity;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price,
      };
    });

    const order = await tx.order.create({
      data: {
        userId,
        total,
        items: { create: orderItemsData }, // order.items según schema Prisma
      },
    });

    await tx.cartItem.deleteMany({ where: { userId } });

    return order;
  });
};

export const getUserOrders = (userId: number) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      payment: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const getOrderById = (id: number) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      payment: true,
    },
  });
};

export const updateOrderStatus = (id: number, status: string) => {
  return prisma.order.update({
    where: { id },
    data: { status },
  });
};

export const deleteOrder = async (orderId: number) => {
  // Primero eliminar items relacionados para evitar FK constraints
  await prisma.orderItem.deleteMany({ where: { orderId } });
  // Luego eliminar la orden
  return prisma.order.delete({ where: { id: orderId } });
};
