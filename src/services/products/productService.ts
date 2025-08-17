import prisma from '../../config/prisma';

interface ProductData {
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

export const getAllProducts = () =>
  prisma.product.findMany({ include: { category: true, images: true } });

export const getProductById = (id: number) =>
  prisma.product.findUnique({ where: { id }, include: { category: true, images: true } });

export const createProduct = (data: ProductData) =>
  prisma.product.create({ data });

export const updateProduct = (id: number, data: Partial<ProductData>) =>
  prisma.product.update({ where: { id }, data });

export const deleteProduct = (id: number) =>
  prisma.product.delete({ where: { id } });
