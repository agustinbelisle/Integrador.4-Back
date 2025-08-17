// scripts/updatePassword.ts
import bcrypt from 'bcrypt';
import prisma from '../src/config/prisma'; // ajusta según tu estructura

async function updatePassword(email: string, newPassword: string) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    console.log(`Contraseña actualizada para usuario ${updatedUser.email}`);
  } catch (error) {
    console.error('Error actualizando contraseña:', error);
  } finally {
    await prisma.$disconnect();
  }
}

const email = 'juan@example.com';
const newPassword = '123456'; // o la que quieras asignar

updatePassword(email, newPassword);
