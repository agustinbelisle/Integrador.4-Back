// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { products } from './data/products';

const prisma = new PrismaClient();

async function main() {
  // 👉 Categorías (crear si no existen)
  const categoryNames = [
    'Notebooks',
    'Smartphones',
    'Accesorios',
    'Audio',
    'Gaming',
    'Hogar',
  ];

  for (const name of categoryNames) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // 👉 Usuarios
  const users = [
    {
      name: 'Agustín Admin',
      email: 'admin@ecommerce.com',
      password: 'Admin1234',
      role: 'admin',
    },
    {
      name: 'Laura López',
      email: 'laura@example.com',
      password: 'Laura123',
    },
    {
      name: 'Carlos Ruiz',
      email: 'carlos@example.com',
      password: 'Carlos123',
    },
  ];

  for (const user of users) {
    const exists = await prisma.user.findUnique({ where: { email: user.email } });
    if (!exists) {
      const hashed = await bcrypt.hash(user.password, 10);
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashed,
          role: user.role || 'user',
        },
      });
    }
  }

// 👉 Productos con imágenes
for (const product of products) {
  const category = await prisma.category.findUnique({
    where: { name: product.categoryName },
  });

  if (!category) {
    console.warn(`⚠️ Categoría no encontrada: ${product.categoryName}`);
    continue;
  }

  const createdProduct = await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: category.id,
    },
  });

  const imageData = product.images.map((img) => ({
    url: img.url, // 👈 Acceder correctamente al campo `url`
    productId: createdProduct.id,
  }));

  await prisma.productImage.createMany({
    data: imageData,
  });
}


  console.log('✅ Seed completado con categorías, usuarios, productos e imágenes');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
