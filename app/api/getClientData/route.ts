"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getClientData = async () => {
  try {
    const users = await prisma.user.findMany({
        where: {
            isRole: 'USER',
        },
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};