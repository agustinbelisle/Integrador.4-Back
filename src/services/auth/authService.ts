import prisma from '../../config/prisma';
import bcrypt from 'bcrypt';

export const register = async (name: string, email: string, password: string) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('El email ya está en uso');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { 
      name, 
      email, 
      password: hashedPassword,
      role: 'user',  // Asignamos rol por defecto
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    }
  });

  return user;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
    }
  });
  if (!user) throw new Error('Credenciales inválidas');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Credenciales inválidas');

  // Retornamos el usuario sin la contraseña
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
