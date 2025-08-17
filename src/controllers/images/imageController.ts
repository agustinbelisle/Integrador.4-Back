// src/controllers/images/imageController.ts
import { Request, Response } from 'express';
import * as imageService from '../../services/images/imageService';
import { Prisma } from '@prisma/client';

export const addImage = async (req: Request, res: Response) => {
  try {
    const { productId, url } = req.body;
    const newImage = await imageService.createImage(productId, url);
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear imagen', error });
  }
};

export const getImagesByProduct = async (req: Request, res: Response) => {
  try {
    const productId = +req.params.productId;
    const images = await imageService.getImagesByProduct(productId);
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener imágenes', error });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const imageId = +req.params.id;
    await imageService.deleteImage(imageId);
    res.json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return res.status(404).json({ message: 'La imagen no existe o ya fue eliminada' });
    }
    res.status(500).json({ message: 'Error al eliminar imagen', error });
  }
};

