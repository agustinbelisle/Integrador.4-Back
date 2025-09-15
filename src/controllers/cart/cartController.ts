import { Request, Response } from 'express';
import * as cartService from '../../services/cart/cartService';

export const getCart = async (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const items = await cartService.getCartItemsByUser(userId);

  const normalized = items.map((i) => ({
    itemId: i.id,
    quantity: i.quantity,
    product: i.product,
  }));

  res.json(normalized);
};

export const addToCart = async (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const { productId, quantity, selected = true } = req.body;
  const item = await cartService.addToCart(userId, productId, quantity, selected);

  res.status(201).json({
    itemId: item.id,
    quantity: item.quantity,
    product: item.product,
  });
};

export const updateCartItem = async (req: Request, res: Response) => {
  const itemId = +req.params.itemId;
  const { quantity } = req.body;
  const updated = await cartService.updateCartItem(itemId, quantity);

  res.json({
    message: 'Cantidad actualizada correctamente',
    item: {
      itemId: updated.id,
      quantity: updated.quantity,
      product: updated.product,
    },
  });
};

export const removeFromCart = async (req: Request, res: Response) => {
  const itemId = +req.params.itemId;
  await cartService.removeFromCart(itemId);
  res.status(200).json({ message: 'Item eliminado del carrito' });
};

export const clearCart = async (req: Request, res: Response) => {
  const userId = +req.params.userId;
  await cartService.clearCart(userId);
  res.status(200).json({ message: 'Carrito vaciado correctamente' });
};
