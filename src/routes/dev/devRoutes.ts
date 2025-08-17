import express from 'express';
import prisma from '../../config/prisma';

const router = express.Router();

router.delete('/reset', async (_req, res) => {
  try {
    await prisma.cartItem.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    res.json({ message: 'Datos eliminados correctamente ✅' });
  } catch (error) {
    res.status(500).json({ message: 'Error al resetear datos', error });
  }
});

router.post('/seed', async (_req, res) => {
  try {
    // 1. Crear usuario
    const user = await prisma.user.create({
      data: {
        name: 'Agustín',
        email: 'agus@example.com',
        password: '123456' // En producción, jamás sin hash
      }
    });

    // 2. Crear categorías
    const [notebooks, smartphones, accesorios] = await Promise.all([
      prisma.category.create({ data: { name: 'Notebooks' } }),
      prisma.category.create({ data: { name: 'Smartphones' } }),
      prisma.category.create({ data: { name: 'Accesorios' } })
    ]);

    // 3. Crear productos
    await prisma.product.createMany({
      data: [
        {
          name: 'Notebook Acer Aspire 5',
          description: '15.6", Ryzen 5, 16GB RAM, 512GB SSD',
          price: 950,
          categoryId: notebooks.id
        },
        {
          name: 'Notebook HP Pavilion',
          description: '14", Intel i5, 8GB RAM, 256GB SSD',
          price: 780,
          categoryId: notebooks.id
        },
        {
          name: 'Samsung Galaxy S21',
          description: '6.2", 128GB, 8GB RAM',
          price: 600,
          categoryId: smartphones.id
        },
        {
          name: 'iPhone 13',
          description: '6.1", 128GB, A15 Bionic',
          price: 820,
          categoryId: smartphones.id
        },
        {
          name: 'Teclado Redragon',
          description: 'RGB, switches blue, USB',
          price: 55,
          categoryId: accesorios.id
        },
        {
          name: 'Mouse Logitech G203',
          description: 'RGB, 8000 DPI',
          price: 35,
          categoryId: accesorios.id
        }
      ]
    });

    res.json({ message: 'Datos insertados correctamente ✅', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Error al insertar datos', error });
  }
});


export default router;
