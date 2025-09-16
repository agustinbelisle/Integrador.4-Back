import { Request, Response } from 'express';
import * as orderService from '../../services/orders/orderService';
import { sendOrderConfirmationEmail } from '../../services/emailService';

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const order = await orderService.createOrderFromCart(userId);

    if (req.user?.email) {
      await sendOrderConfirmationEmail(
        req.user.email,
        order.id,
        order.total,
        order.items
      );
    }

    return res.status(201).json(order);
  } catch (error: any) {
    return res.status(500).json({
      message: 'Error al crear la orden',
      error: error.message || 'Error desconocido',
    });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = +req.params.userId;
    const orders = await orderService.getUserOrders(userId);
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener órdenes', error });
  }
};

export const getAllOrders = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const orders = await orderService.getAllOrders();
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener todas las órdenes', error });
  }
};

export const getOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = await orderService.getOrderById(+req.params.id);
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener la orden', error });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { status } = req.body;
    const updated = await orderService.updateOrderStatus(+req.params.id, status);
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar estado', error });
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orderId = Number(req.params.id);
    if (isNaN(orderId) || orderId <= 0) {
      return res.status(400).json({ message: 'ID de orden inválido' });
    }

    await orderService.deleteOrder(orderId);
    return res.json({ message: 'Orden eliminada correctamente' });
  } catch (error: any) {
    return res.status(500).json({
      message: 'Error al eliminar la orden',
      error: error.message || 'Error desconocido',
    });
  }
};
