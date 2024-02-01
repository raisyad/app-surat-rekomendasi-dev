import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { getUserSession } from "@/app/api/getUserSession/route";
import { getTransaksiForm } from "@/app/api/getTransaksiForm/route";
import { useRouter } from 'next/navigation';
// import Button from "@/components/"
// import { Inertia } from "@inertiajs/inertia";
import { Button } from "@/components/ui/button"

export default function AddKoleksiModal({ isOpen, onClose, isLaporann, onLaporan }) {
  let [nama, setNama] = useState("");
  let [tempat, setTempat] = useState("");
  let [idTransaksi, setIdTransaksi] = useState(0);
  const { push } = useRouter();
  let [isLaporan, setisLaporan] = useState(isLaporann);
  const [file_laporan, setFileLaporan] = useState(null);
  const [tglKegiatan, setTglKegiatan] = useState('');
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  let [deskripsi, setDeskripsi] = useState("");
  let [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  let [minutes, setMinutes] = useState(0);
  let [hours, setHours] = useState(0);

  useEffect(() => {
    // Mengatur nilai awal dengan format yang diinginkan (YYYY-MM-DD)
    const now = new Date().toISOString().split('T')[0];
    setTglKegiatan(now);
  }, []);

  const handleLaporan = () => {
    // console.log("masuk");
    setisLaporan(true);
    onLaporan = isLaporan;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.email) {
          const usersData = await getUserSession(session.user.email);
          const datas = await getTransaksiForm(usersData[0].id);
          // console.log(datas);
          if(datas.length > 0) 
          // console.log(datas[0].nama_kegiatan, datas[0].tempat)
            if (datas[0].isStatus == 'Proses') {
              setNama(datas[0].nama_kegiatan)
              setTempat(datas[0].tempat)
              setIdTransaksi(datas[0].id)
            }
            else setStatsForm(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [session]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file_laporan", file_laporan);
      formData.append("idTransaksi", idTransaksi.toString());
      // console.log(formData);
      // formData.append("file_laporan", file_laporan);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Failed to upload files: ${await response.text()}`);
      }
      console.log("hihah")
      push("/user/suratrekomendasi");
      setMessage("Files uploaded successfully");
    } catch (error) {
      setMessage(`Error uploading files: ${error}`);
    }
  };

  return (
    <Transition.Root appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="z-10 my-auto" onClose={() => onClose(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform rounded-lg bg-white border p-3 text-left shadow-xl transition-all"
                style={{ maxHeight: "90vh", overflowY: "auto" }}
              >
                <form 
                onSubmit={onSubmit}
                >
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-black leading-6 text-blue-800 my-4"
                      >
                        Upload Laporan Kegiatan
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="flex gap-8 p-4 align-items-center items-center align-center">
                          <h1 className="flex justify-start text-lg items-start py-1 font-bold">
                            Nama Kegiatan
                          </h1>
                          <div className="mt-2">
                            <Input
                              onChange={(e) => setNama(e.target.value)}
                              value={nama}
                              type="text"
                              name=""
                              id=""
                              autoComplete="given-name"
                              readOnly
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="flex gap-8 p-4 align-items-center items-center align-center">
                          <h1 className="flex justify-start text-lg items-start py-1 font-bold">
                            Tanggal Kegiatan
                          </h1>
                          <div className="mt-2">
                            <Input
                              onChange={(e) => setTglKegiatan(e.target.value)}
                              // value={TglReg}
                              value={tglKegiatan}
                              type="date"
                              name=""
                              id=""
                              autoComplete="given-name"
                              readOnly
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="flex gap-8 p-4  align-items-center items-center align-center">
                          <label className="flex justify-start text-lg items-start font-bold">
                            Tempat Kegiatan
                          </label>
                          <div className="mt-2">
                            <Input
                              onChange={(e) => setTempat(e.target.value)}
                              value={tempat}
                              type="text"
                              name=""
                              id=""
                              autoComplete="given-name"
                              readOnly
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="flex gap-8 p-4 align-items-center items-center align-center">
                          <h1 className="flex justify-start text-lg items-start py-1 font-bold">
                            Upload Laporan Kegiatan
                          </h1>
                          <div className="mt-2">
                            <Input
                              // onChange={(e) => set(e.target.value)}
                              // value={}
                              onChange={(e) =>
                                setFileLaporan(e.target.files?.[0] || null)
                              }
                              type="file"
                              name=""
                              id=""
                              autoComplete="given-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl rounded-t-none">
                    <div className="flex gap-4 mt-4">
                      <Button
                        type="submit"
                        onClick={handleLaporan}
                        className="py-2 w-full bg-green-800 border border-transparent rounded-md font-semibold text-xs text-white focus:bg-cyan-700 active:bg-gray-900 focus:text-white focus:outline-none transition ease-in-out duration-150"
                      >
                        <h1 id="container" className="text-lg font-bold">
                          Kirim
                        </h1>
                      </Button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
