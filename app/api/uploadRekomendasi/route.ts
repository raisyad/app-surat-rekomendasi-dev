"use server";

import prisma from "@/lib/prisma";
import { ObjectEnumValue } from "@prisma/client/runtime/library";
export const uploadFile = async (
  TglReg: string,
  TglNaskah: string,
  Hal: string,
  // nama_instansi: string,
  file_surat: string,
  nama_kegiatan: string,
  start_kegiatan: string,
  end_kegiatan: string,
  jumlah_peserta: number,
  tempat: string,
  // keterangan: string,
  // file_laporan: string,
  id_user: string
) => {
  try {
    await prisma.transaksi.create({
      data: {
        TglReg: TglReg,
        TglNaskah: TglNaskah,
        Hal: Hal,
        nama_instansi: 'BPSDM',
        file_surat: file_surat,
        file_surat_name: "-",
        tgl_verifikasi: TglReg,
        nama_kegiatan: nama_kegiatan,
        start_kegiatan: start_kegiatan,
        end_kegiatan: end_kegiatan,
        jumlah_peserta: jumlah_peserta,
        tempat: tempat,
        isStatus: "Proses",
        keterangan: 'kikuk',
        // file_laporan: file_laporan,
        balasan_surat: "belumBalas",
        file_balasan: '-',
        id_user: id_user,
      },
    });
    return "done king";
  } catch (error) {
    console.error("Error during upload:", error);
    throw error;
  }
};
