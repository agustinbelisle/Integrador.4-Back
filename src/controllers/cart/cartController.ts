import { Request, Response } from 'express';
import * as cartService from '../../services/cart/cartService';

export const getCart = async (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const items = await cartService.getCartItemsByUser(userId);
  res.json(items);
};

export const addToCart = async (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const { productId, quantity, selected = true } = req.body;
  const item = await cartService.addToCart(userId, productId, quantity, selected);
  res.status(201).json(item);
};


export const updateCartItem = async (req: Request, res: Response) => {
  const itemId = +req.params.itemId;
  const { quantity } = req.body;
  const updated = await cartService.updateCartItem(itemId, quantity);
  res.json({
    message: 'Cantidad actualizada correctamente',
    item: updated
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

