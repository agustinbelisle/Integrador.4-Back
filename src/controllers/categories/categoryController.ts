import { Request, Response } from 'express';
import * as categoryService from '../../services/categories/categoryService';
import { Prisma } from '@prisma/client';

export const getAllCategories = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener las categorías', error });
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const category = await categoryService.getCategoryById(+req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener la categoría', error });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name } = req.body;
    const newCategory = await categoryService.createCategory(name);
    return res.status(201).json(newCategory);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(400).json({ message: 'Ya existe una categoría con ese nombre' });
    }
    return res.status(500).json({ message: 'Error al crear la categoría', error });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name } = req.body;
    const updated = await categoryService.updateCategory(+req.params.id, name);
    return res.json(updated);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(400).json({ message: 'Ya existe una categoría con ese nombre' });
    }
    return res.status(500).json({ message: 'Error al actualizar la categoría', error });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deleted = await categoryService.deleteCategory(+req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    return res.status(200).json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar la categoría', error });
  }
};

