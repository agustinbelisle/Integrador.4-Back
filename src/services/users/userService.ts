import prisma from '../../config/prisma';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export const getAllUsers = () => prisma.user.findMany();

export const getUserById = (id: number) =>
  prisma.user.findUnique({ where: { id } });

export const createUser = (data: CreateUserData) =>
  prisma.user.create({ data });

export const updateUser = (id: number, data: Partial<CreateUserData>) =>
  prisma.user.update({ where: { id }, data });

export const deleteUser = async (id: number) => {
  // borrar órdenes del usuario (con items y pagos)
  const orders = await prisma.order.findMany({ where: { userId: id } });

  for (const order of orders) {
    await prisma.payment.deleteMany({ where: { orderId: order.id } });
    await prisma.orderItem.deleteMany({ where: { orderId: order.id } });
  }

  await prisma.order.deleteMany({ where: { userId: id } });

  // finalmente borrar usuario
  return prisma.user.delete({ where: { id } });
};

export const updateUserRole = (id: number, role: string) =>
  prisma.user.update({
    where: { id },
    data: { role }
  });


