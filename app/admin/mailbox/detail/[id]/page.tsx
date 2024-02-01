// import React from 'react'
"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { DocumentArrowUpIcon, EyeIcon } from "@heroicons/react/20/solid";
import {
  ClipboardDocumentListIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import Modal from "@/components/ModalBalasSuratRekomendasi";
const tablerow = [
  {
    tanggal: "26 - 06 - 2023 07 : 35 : 14",
    asal_surat: "Universitas Pendidikan Indonesia",
    kegiatan: "Pelatihan Bahasa Inggris",
    tanggal_kegiatan: "26 - 06 - 2023 07 : 35 : 14",
    hal: "Pengajuan Surat Rekomendasi",
    status_balasan: "Sudah dibalas",
  },
  {
    tanggal: "07 : 35 : 14 07 : 35 : 14",
    asal_surat: "Universitas Pendidikan Indonesia",
    kegiatan: "Pelatihan P3K",
    tanggal_kegiatan: "31 - 06 - 2023 07 : 35 : 14",
    hal: "Pelatihan Kemahasiswaan",
    status_balasan: "Sudah dibalas",
  },
];
const page = (id: any) => {
  console.log(id.params.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLaporan, setIsLaporan] = useState(false);
  const handleLinkClick = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <div>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              {/* <TableHead>No</TableHead> */}
              <TableHead>Tanggal</TableHead>
              <TableHead>Asal Surat</TableHead>
              <TableHead>Hal</TableHead>
              <TableHead>Status Balasan</TableHead>
              <TableHead>Kegiatan</TableHead>
              <TableHead>Tanggal Kegiatan</TableHead>
              <TableHead>File Surat</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {tablerow.map((row, index) => ( */}
              <TableRow >
                {/* <TableCell className="font-medium">{index + 1}</TableCell> */}
                <TableCell>{tablerow[id.params.id].tanggal}</TableCell>
                <TableCell>{tablerow[id.params.id].asal_surat}</TableCell>
                <TableCell>{tablerow[id.params.id].hal}</TableCell>
                <TableCell>{tablerow[id.params.id].status_balasan}</TableCell>
                <TableCell>{tablerow[id.params.id].kegiatan}</TableCell>
                <TableCell>{tablerow[id.params.id].tanggal_kegiatan}</TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <Link href="#" onClick={handleLinkClick}>
                      <DocumentArrowUpIcon className="h-6 w-6 text-black" />
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <Link href={`/admin/mailbox/detail/${id.params.id}`}>
                      <PencilSquareIcon className="h-6 w-6 text-black" />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
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
    </div>
  );
};

export default page;
