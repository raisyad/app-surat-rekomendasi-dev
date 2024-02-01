"use client"
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
import { getClientData } from "@/app/api/getClientData/route";
import { Fragment, useRef, useState, useEffect } from "react";
import { deleteTransaksiForm } from "@/app/api/deleteDataClient/route";
import { useRouter } from 'next/navigation';
import { revalidatePath } from "next/cache";
const tablerow = [
  {
    nama: "Universitas Pendidikan Indonesia",
    email: "bpsdm@gmail.com",
    status: "Terverifikasi",
    Telepon: "0880-1234-5678",
    status_akun: "Email Terverifikasi",
  },
  {
    nama: "Universitas Pendidikan Indonesia",
    email: "bpsdm@gmail.com",
    status: "Belum Verifikasi",
    Telepon: "0880-1234-5678",
    status_akun: "Email Terverifikasi",
  },
];
const page = () => {

  const [clientData, setClientData] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datas = await getClientData();
        if(datas) setClientData(datas);
        console.log(datas);
        // setClientData(datas);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchData();
  }, []);

  const onDelete = async (id) => {
    try {
      console.log(`Data with ID ${id} has been deleted`);
      await deleteTransaksiForm(id);
      window.location.reload();
      revalidatePath('/admin/user', 'page')
      // Lakukan hal-hal lain setelah penghapusan berhasil
    } catch (error) {
      console.error('Error deleting data:', error);
      // Handle error jika diperlukan
    }
  }
  return (
    <div> 
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama Pengirim</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telepon</TableHead>
            <TableHead>Status Verifikasi</TableHead>
            <TableHead>Status Verifikasi</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientData.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{row.nama}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.no_sk}</TableCell> 
              <TableCell>{row.isVerifikasi}</TableCell>
              <TableCell>{row.isVerifikasi}</TableCell>
              <TableCell>
                  <Button variant="destructive" onClick={() => onDelete(row.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
