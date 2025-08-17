// src/controllers/payments/paymentController.ts
import { Request, Response } from 'express';
import * as paymentService from '../../services/payments/paymentService';

export const payOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orderId = +req.params.orderId;
    const { method } = req.body;

    const payment = await paymentService.processPayment(orderId, method);
    return res.status(201).json(payment);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
