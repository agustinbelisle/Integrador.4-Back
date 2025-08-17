import prisma from '../../config/prisma';

export const createImage = (productId: number, url: string) =>
  prisma.productImage.create({
    data: { productId, url }
  });

export const getImagesByProduct = (productId: number) =>
  prisma.productImage.findMany({
    where: { productId }
  });

export const deleteImage = (id: number) =>
  prisma.productImage.delete({ where: { id } });
