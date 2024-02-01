// Di dalam utils/prisma.js
'use server'
import { PrismaClient, Transaksi } from '@prisma/client';

const prisma = new PrismaClient();

export const getTransaksiForm = async (id_users: string): Promise<Transaksi[]> => {
  try {
    const datas = await prisma.transaksi.findFirst({
      where: {
        id_user: id_users,
        // isStatus: "Proses",
      },
    });

    return datas ? [datas] : [];
  } catch (error) {
    console.error('Error fetching datas transaksi:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
