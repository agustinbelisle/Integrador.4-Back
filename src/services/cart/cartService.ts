import prisma from '../../config/prisma';

export const getCartItemsByUser = async (userId: number) => {
  if (!userId) throw new Error("User ID es requerido");
  return prisma.cartItem.findMany({
    where: { userId },
    include: { 
      product: {
        include: {
          images: true, // Incluye imágenes si las tienes en el modelo ProductImage relacionado
        }
      }
    }
  });
};

export const addToCart = async (
  userId: number,
  productId: number,
  quantity: number,
  selected: boolean = true
) => {
  if (!userId || !productId || quantity <= 0) {
    throw new Error("Parámetros inválidos para añadir al carrito");
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { userId, productId }
  });

  if (existingItem) {
    // Actualizamos la cantidad e incluimos el producto y sus imágenes en la respuesta
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
        selected,
      },
      include: {
        product: {
          include: { images: true }
        },
      },
    });
  }

  // Creamos nuevo item e incluimos producto con imágenes en la respuesta
  return prisma.cartItem.create({
    data: { userId, productId, quantity, selected },
    include: {
      product: {
        include: { images: true }
      },
    },
  });
};

export const updateCartItem = async (itemId: number, quantity: number) => {
  if (!itemId || quantity < 0) throw new Error("Datos inválidos para actualizar item");

  return prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
    include: {
      product: {
        include: { images: true }
      }
    }
  });
};

export const removeFromCart = async (itemId: number) => {
  if (!itemId) throw new Error("ID del item requerido para eliminar");
  return prisma.cartItem.delete({ where: { id: itemId } });
};

export const clearCart = async (userId: number) => {
  if (!userId) throw new Error("User ID requerido para vaciar carrito");
  return prisma.cartItem.deleteMany({ where: { userId } });
};
