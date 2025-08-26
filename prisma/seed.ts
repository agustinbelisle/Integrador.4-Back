import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { products } from './data/products';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando seed...');

  // 👉 Categorías
  const categoryNames = ['Notebooks', 'Smartphones', 'Accesorios', 'Audio', 'Gaming', 'Hogar'];
  for (const name of categoryNames) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log('📁 Categorías listas');

  // 👉 Usuarios
  const users = [
    { name: 'Agustín Admin', email: 'admin@ecommerce.com', password: 'Admin1234', role: 'admin' },
    { name: 'Laura López', email: 'laura@example.com', password: 'Laura123' },
    { name: 'Carlos Ruiz', email: 'carlos@example.com', password: 'Carlos123' },
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
      console.log(`👤 Usuario creado: ${user.email}`);
    }
  }

  // 👉 Productos con imágenes
  let productCount = 0;
  for (const product of products) {
    const category = await prisma.category.findUnique({ where: { name: product.categoryName } });
    if (!category) {
      console.warn(`⚠️ Categoría no encontrada: ${product.categoryName}. Producto omitido: ${product.name}`);
      continue;
    }

    const exists = await prisma.product.findFirst({
      where: {
        name: product.name,
        categoryId: category.id,
      },
    });
    if (exists) {
      console.log(`🔁 Producto ya existe: ${product.name}`);
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

    const imageData = product.images
      .filter((img) => img.url && typeof img.url === 'string')
      .map((img) => ({
        url: img.url.replace('http://localhost:5000', 'https://integrador-4-back.onrender.com'),
        productId: createdProduct.id,
      }));

    try {
      await prisma.productImage.createMany({ data: imageData });
      console.log(`✅ Producto creado: ${product.name}`);
      productCount++;
    } catch (err) {
      console.error(`❌ Error al insertar imágenes para ${product.name}:`, err);
    }
  }

  console.log(`🎯 Seed completado: ${productCount} productos insertados`);
}

main()
  .catch((e) => {
    console.error('🔥 Error en el seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

