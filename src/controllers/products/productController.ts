import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import * as productService from '../../services/products/productService';

const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const page = +req.query.page! || 1;
    const limit = +req.query.limit! || 18;
    const skip = (page - 1) * limit;
    const category = req.query.category as string | undefined;

    const whereClause = category
      ? {
          category: {
            is: {
              name: {
                equals: category,
                mode: Prisma.QueryMode.insensitive
              }
            }
          }
        }
      : undefined;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        where: whereClause,
        include: { images: true, category: true },
      }),
      prisma.product.count({ where: whereClause }),
    ]);

    return res.json({
      total,
      page,
      pageCount: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    return res.status(500).json({ message: 'Error al obtener productos' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const product = await productService.getProductById(+req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener producto', error });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, description, price, categoryId } = req.body;
    const newProduct = await productService.createProduct({ name, description, price, categoryId });
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear producto', error });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const updated = await productService.updateProduct(+req.params.id, req.body);
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar producto', error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    return res.json({ message: 'Producto eliminado correctamente ✅' });
  } catch (error) {
    return res.status(404).json({ message: 'Producto no encontrado ❌' });
  }
};



