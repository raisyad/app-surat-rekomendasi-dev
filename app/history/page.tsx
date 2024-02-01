"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/AddKoleksiModal";

import Sidebar from "@/components/sidebar";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeIcon } from "@heroicons/react/24/solid";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const tablerow = [
  {
    nama: "Universitas Pendidikan Indonesia",
    hal: "Pengajuan Surat Rekomendasi Pelatihan Kemahasiswaan",
    status: "Terverifikasi",
    laporan: "Selesai",
    icon: EyeIcon,
  },
  {
    nama: "Universitas Pendidikan Indonesia",
    hal: "Pengajuan Surat Rekomendasi Pelatihan Kemahasiswaan",
    status: "Sedang Diproses",
    laporan: "Belum Upload Laporan",
    icon: EyeIcon,
  },
  {
    nama: "Universitas Pendidikan Indonesia",
    hal: "Pengajuan Surat Rekomendasi Pelatihan Kemahasiswaan",
    status: "Ditolak",
    laporan: "",
    icon: EyeIcon,
  },
];

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLaporan, setIsLaporan] = useState(false);

  return (
    <div>
      <Sidebar>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Hal</TableHead>
              <TableHead>Status Verifikasi</TableHead>
              <TableHead>Laporan</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tablerow.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{row.nama}</TableCell>
                <TableCell>{row.hal}</TableCell>
                <TableCell
                  style={{
                    backgroundColor:
                      row.status === "Terverifikasi"
                        ? "#E6F6EC"
                        : row.status === "Sedang Diproses"
                        ? "#FBF0CB"
                        : row.status === "Ditolak"
                        ? "#FFEBEE"
                        : "",
                    color:
                      row.status === "Terverifikasi"
                        ? "#16A75C"
                        : row.status === "Sedang Diproses"
                        ? "#D1A400"
                        : row.status === "Ditolak"
                        ? "#F44336"
                        : "",
                    borderRadius: "0.75rem",
                  }}
                >
                  {row.status}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor:
                      row.laporan === "Selesai"
                        ? "#E6F6EC"
                        : row.status === "Sedang Diproses"
                        ? "#FFEBEE"
                        : "",
                    color:
                      row.laporan === "Selesai"
                        ? "#16A75C"
                        : row.status === "Sedang Diproses"
                        ? "#F44336"
                        : "",
                    borderRadius: "0.75rem",
                  }}
                >
                  {row.laporan}
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <button>
                      <DocumentArrowUpIcon
                        className="h-6 w-6 text-black"
                        onClick={() => setIsModalOpen(true)}
                      />
                    </button>
                    <Link href={`/history/detail/${index}`}>
                      <EyeIcon className="h-6 w-6 text-black" />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Sidebar>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          // isLaporan={true}
          isLaporann={isLaporan}
          onLaporan={() => setIsLaporan(true)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default page;
