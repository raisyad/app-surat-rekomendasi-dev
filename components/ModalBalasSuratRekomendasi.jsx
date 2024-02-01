import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Input } from "@/components/ui/input";
// import Button from "@/components/"
// import { Inertia } from "@inertiajs/inertia";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddKoleksiModal({
  isOpen,
  onClose,
  isLaporann,
  onLaporan,
}) {
  let [nama, setNama] = useState("");
  let [isLaporan, setisLaporan] = useState(isLaporann);
  let [deskripsi, setDeskripsi] = useState("");
  let [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  let [minutes, setMinutes] = useState(0);
  let [hours, setHours] = useState(0);

  const handleLaporan = () => {
    console.log("masuk");
    setisLaporan(true);
    onLaporan = isLaporan;
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
                // onSubmit={onSubmit}
                >
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-black leading-6 text-blue-800 my-4"
                      >
                        Balas Surat Rekomendasi
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="flex gap-8 p-4 align-items-center items-center align-center">
                          <h1 className="flex justify-start text-lg items-start py-1 font-bold">
                            Verifikasi Naskah
                          </h1>
                          <div className="mt-2">
                            <Select>
                              <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="Pilih" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">Pilihan 1</SelectItem>
                                <SelectItem value="dark">Pilihan 2</SelectItem>
                                <SelectItem value="system">
                                  Pilihan 3
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex gap-8 p-4 align-items-center items-center align-center">
                          <h1 className="flex justify-start text-lg items-start py-1 font-bold">
                            Upload Surat Rekomendasi
                          </h1>
                          <div className="mt-2">
                            <Input
                              // onChange={(e) => set(e.target.value)}
                              // value={}
                              type="file"
                              name=""
                              id=""
                              autoComplete="given-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="flex gap-8 p-4  align-items-center items-center align-center">
                          <label className="flex justify-start text-lg items-start font-bold">
                            Keterangan
                          </label>
                          <div className="mt-2">
                            <Input
                              // onChange={(e) => set(e.target.value)}
                              // value={}
                              type="text"
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
