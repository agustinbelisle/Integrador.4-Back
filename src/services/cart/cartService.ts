// src/services/cart/cartService.ts
import prisma from '../../config/prisma';

/**
 * Obtener todos los items del carrito de un usuario
 */
export const getCartItemsByUser = async (userId: number) => {
  if (!userId) throw new Error("User ID es requerido");

  return prisma.cartItem.findMany({
    where: { userId },
    include: { 
      product: {
        include: { images: true }
      }
    }
  });
};

/**
 * Agregar un producto al carrito
 * - Si ya existe (userId + productId), incrementa cantidad
 * - Si no existe, lo crea
 */
export const addToCart = async (
  userId: number,
  productId: number,
  quantity: number,
  selected: boolean = true
) => {
  if (!userId || !productId || quantity <= 0) {
    throw new Error("Parámetros inválidos para añadir al carrito");
  }

  return prisma.cartItem.upsert({
    where: {
      userId_productId: { userId, productId } // clave compuesta única
    },
    update: {
      quantity: { increment: quantity },
      selected,
    },
    create: {
      userId,
      productId,
      quantity,
      selected,
    },
    include: {
      product: {
        include: { images: true }
      }
    }
  });
};

/**
 * Actualizar la cantidad de un item existente
 */
export const updateCartItem = async (itemId: number, quantity: number) => {
  if (!itemId || quantity < 0) throw new Error("Datos inválidos para actualizar item");

  return prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
    include: {
      product: { include: { images: true } }
    }
  });
};

/**
 * Eliminar un item del carrito
 */
export const removeFromCart = async (itemId: number) => {
  if (!itemId) throw new Error("ID del item requerido para eliminar");
  return prisma.cartItem.delete({ where: { id: itemId } });
};

/**
 * Vaciar el carrito de un usuario
 */
export const clearCart = async (userId: number) => {
  if (!userId) throw new Error("User ID requerido para vaciar carrito");
  return prisma.cartItem.deleteMany({ where: { userId } });
};
