"use client";
// import { uploadFile } from "@/app/api/uploadRekomendasi";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadFile } from "@/app/api/uploadRekomendasi/route";
import { getUserSession } from "@/app/api/getUserSession/route";
import { useSession } from "next-auth/react";
import Modal from "@/components/AddKoleksiModal";
interface User {
  id: string;
  nama: string;
  email: string;
  no_sk: string;
  file_sk: string | null;
  password: string;
  foto_profile: string | null;
  no_telp: string;
  alamat: string | null;
}
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "./Footer";
import { start } from "repl";
import { getTransaksiForm } from "@/app/api/getTransaksiForm/route";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const UploadFileForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLaporan, setIsLaporan] = useState(true);
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [TglReg, setTglReg] = useState("");
  const [TglNaskah, setTglNaskah] = useState("");
  const [NoNaskah, setNoNaskah] = useState("");
  const [Hal, setHal] = useState("");
  // const [nama_instansi, setNamaInstansi] = useState("");
  const [kontak, setKontak] = useState("");
  const [file_surat, setFileSurat] = useState<File | null>(null);
  // const [file_surat_name, setFileSuratName] = useState("");
  const [nama_kegiatan, setNamaKegiatan] = useState("");
  const [start_kegiatan, setStartKegiatan] = useState("");
  const [end_kegiatan, setEndKegiatan] = useState("");
  const [jumlah_peserta, setJumlahPeserta] = useState(0);
  const [tempat, setTempat] = useState("");
  const [isStatus, setIsStatus] = useState("");
  const [statsForm, setStatsForm] = useState(true);
  // const [keterangan, setKeterangan] = useState("");
  // const [file_laporan, setFileLaporan] = useState<File | null>(null);
  const [id_user, setIdUser] = useState("");
  const [message, setMessage] = useState<string>("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.email) {
          const usersData = await getUserSession(session.user.email);
          const datas = await getTransaksiForm(usersData[0].id);
          console.log(datas);
          if(datas.length > 0) 
            if (datas[0].isStatus == 'Proses') setStatsForm(false);
            else setStatsForm(true);
          // else 
          //   setStatsForm(true);

          setIdUser(usersData[0].id);
          setKontak(usersData[0].no_telp);
          // Penanganan nilai null di sini
          setUsers(usersData || []); // Jika usersData null, berikan array kosong
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    // Dapatkan tanggal sekarang dalam format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    
    // Atur nilai tanggal menggunakan setState
    setTglReg(today);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file_surat) {
      setMessage("Please select all three files");
      return;
    }

    // Mengonversi format tanggal
    const formattedTglReg = new Date(TglReg).toISOString();
    const formattedTglNaskah = new Date(TglNaskah).toISOString();
    const formattedStartKegiatan = new Date(start_kegiatan).toISOString();
    const formattedEndKegiatan = new Date(end_kegiatan).toISOString();

    // setMessage("tunggu gan");
    const message = await uploadFile(
      formattedTglReg,
      formattedTglNaskah,
      Hal,
      file_surat.name,
      nama_kegiatan,
      formattedStartKegiatan,
      formattedEndKegiatan,
      jumlah_peserta,
      tempat,
      // nama_instansi,
      // keterangan,
      id_user
    );
    setMessage(message);
    setMessage("tunggu gan");

    try {
      const formData = new FormData();
      formData.append("file_surat", file_surat);
      // formData.append("file_laporan", file_laporan);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Failed to upload files: ${await response.text()}`);
      }

      setMessage("Files uploaded successfully");
    } catch (error) {
      setMessage(`Error uploading files: ${error}`);
    }
  };

  const handleLaporan = () => {
    setIsLaporan(false);
  };

  return (
    <>
      <div className="pb-10">
        <h4 className="font-bold text-4xl">Form Pengajuan Surat Rekomendasi</h4>
      </div>
      <div className="space-y-12">
        <div className="">
          {statsForm ? (
            <form onSubmit={onSubmit}>
              <Tabs defaultValue="surat" className="pt-6">
                <TabsList>
                  <TabsTrigger value="surat">Surat</TabsTrigger>
                  <TabsTrigger value="kegiatan">Kegiatan</TabsTrigger>
                  <TabsTrigger value="naskah">Naskah</TabsTrigger>
                </TabsList>
                <TabsContent value="surat">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="TglReg"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Tanggal Pencatatan
                      </label>
                      <div className="mt-2">
                        <Input
                          onChange={(e) => setTglReg(e.target.value)}
                          value={TglReg}
                          type="date"
                          name="TglReg"
                          id="TglReg"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="TglNaskah"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Tanggal Naskah
                      </label>
                      <div className="mt-2">
                        <Input
                          onChange={(e) => setTglNaskah(e.target.value)}
                          value={TglNaskah}
                          type="date"
                          name="TglNaskah"
                          id="TglNaskah"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="NoNaskah"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Nomor Naskah
                      </label>
                      <div className="mt-2">
                        <Input
                          onChange={(e) => setNoNaskah(e.target.value)}
                          value={NoNaskah}
                          type="text"
                          name="NoNaskah"
                          id="NoNaskah"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="Hal"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Hal
                      </label>
                      <div className="mt-2">
                        <Input
                          onChange={(e) => setHal(e.target.value)}
                          value={Hal}
                          type="text"
                          name="Hal"
                          id="Hal"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="kegiatan">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="nama_kegiatan"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Nama Kegiatan
                      </label>
                      <div className="mt-2">
                        <Input
                          onChange={(e) => setNamaKegiatan(e.target.value)}
                          value={nama_kegiatan}
                          type="text"
                          name="nama_kegiatan"
                          id="nama_kegiatan"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="start_kegiatan"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Start Kegiatan
                      </label>
                      <div className="mt-2">
                        <Input
                          onChange={(e) => setStartKegiatan(e.target.value)}
                          value={start_kegiatan}
                          type="date"
                          name="start_kegiatan"
                          id="start_kegiatan"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="end_kegiatan"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        End Kegiatan
                      </label>
                      <div className="mt-2">
                        <Input
                          onChange={(e) => setEndKegiatan(e.target.value)}
                          value={end_kegiatan}
                          type="date"
                          name="end_kegiatan"
                          id="end_kegiatan"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="tempat"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Tempat
                      </label>
                      <div className="mt-2">
                        <Input
                          onChange={(e) => setTempat(e.target.value)}
                          value={tempat}
                          type="text"
                          name="tempat"
                          id="tempat"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="jumlah_peserta"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Jumlah Peserta
                      </label>
                      <div className="mt-2">
                        <Input
                          onChange={(e) =>
                            setJumlahPeserta(parseInt(e.target.value, 10))
                          }
                          value={jumlah_peserta}
                          type="number"
                          name="jumlah_peserta"
                          id="jumlah_peserta"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="naskah">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Upload Surat Pengajuan
                      </label>
                      <div className="mt-2">
                        <Input
                          onChange={(e) =>
                            setFileSurat(e.target.files?.[0] || null)
                          }
                          type="file"
                          autoComplete="family-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="kontak"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Kontak Pengirim
                      </label>
                      <div className="mt-2">
                        <Input
                          onChange={(e) => setKontak(e.target.value)}
                          value={kontak}
                          type="text"
                          name="kontak"
                          id="kontak"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="captcha"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Captcha
                      </label>
                      <div className="mt-2">
                        <Input
                          onChange={(e) => setKontak(e.target.value)}
                          value={kontak}
                          type="text"
                          name="captcha"
                          id="captcha"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className=" w-[200px]">
                      <button
                        type="button"
                        className="w-full inline-flex items-center justify-center rounded-md border border-transparent bg-green-800 px-4 py-2 font-medium text-white shadow-sm hover:bg-green-700"
                      >
                        Periksa
                      </button>
                    </div>
                  </div> */}
                </TabsContent>
              </Tabs>
              <div className="pt-6  flex justify-end gap-4">
                <div className=" w-[200px]">
                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center rounded-md border border-green-800 px-4 py-2 font-medium text-green-800 shadow-sm hover:bg-green-800 hover:text-white"
                  >
                    Batal
                  </button>
                </div>
                <div className=" w-[200px]">
                  <button
                    type="submit"
                    // onClick={handleLaporan}
                    className="w-full inline-flex items-center justify-center rounded-md border border-transparent bg-green-800 px-4 py-2 font-medium text-white shadow-sm hover:bg-green-700"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="p-32 border border-gray-300 rounded-xl items-center justify-center align-items-center">
              <h1 className="text-lg items-center justify-center align-items-center text-center">
                Mohon Maaf anda belum melakukan upload Laporan Kegiatan
                Sebelumnya, untuk melakukan upload file dapat menuju link
                berikut,{" "}
                <button
                  // href="/user/laporankegiatan"
                  className="underline text-blue-500"
                  onClick={() => setIsModalOpen(true)}
                >
                  Laporan Kegiatan
                </button>
              </h1>
            </div>
          )}
        </div>
        {/* <button onClick={handleLaporan}>test</button> */}
        <p>{message}</p>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          // isLaporan={true}
          isLaporann={isLaporan}
          onLaporan={()=> setIsLaporan(true)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default UploadFileForm;
