"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};