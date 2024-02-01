// Di dalam utils/prisma.js
'use server'
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserSession = async (email: string): Promise<User[]> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user ? [user] : [];
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
