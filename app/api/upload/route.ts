import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
// import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.formData()
  // console.log(data.get('file_surat'), + ' ',data.get('file'), + ' ', data.get('file3'));
  const file_laporan: File | null = data.get('file_laporan') as unknown as File
  const idTransaksi: number | null = parseInt(data.get('idTransaksi') as string, 10);
  // const file_laporan: File | null = data.get('file_laporan') as unknown as File
  // const file3: File | null = data.get('file3') as unknown as File
  // console.log(file_laporan.name);

  if (!file_laporan) {
    return NextResponse.json({ success: false })
  }
  const paths = process.cwd();
  const folderPath = path.join(paths, "/public/file");
  // console.log(paths)
  const fullPath1 = path.join(paths, "/public/file", file_laporan.name);
  // Mengecek apakah folder sudah ada
  try {
    await fs.access(folderPath);
  } catch (error) {
    // Jika folder belum ada, buat folder
    await fs.mkdir(folderPath, { recursive: true }); // recursive: true untuk membuat folder secara rekursif jika belum ada
  }
  const bytes1 = await file_laporan.arrayBuffer()
  const buffer1 = Buffer.from(bytes1)
  await writeFile(fullPath1, buffer1)

  // Edit Transaksi
  const datas = await prisma.transaksi.findUnique({
    where: { id: idTransaksi }
  });

  if (datas) {
    const updateLaporan = await prisma.transaksi.update({
      where: {
          id: idTransaksi,
      },
      data: {
          file_laporan: file_laporan.name,
          isStatus: 'Selesai',
      },
  });
  }

  return NextResponse.json({ success: true })
}
