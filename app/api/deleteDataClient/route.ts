// Di dalam utils/prisma.js
'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteTransaksiForm = async (id_users: string): Promise<void> => {
  try {
    await prisma.user.delete({
      where: {
        id: id_users,
        // isStatus: "Proses",
      },
    });

    // Optional: Jika Anda perlu memberikan respons setelah penghapusan berhasil
    return Promise.resolve(); // atau return Promise.resolve({ success: true });
  } catch (error) {
    console.error('Error deleting datas transaksi:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
