"use client";
// import { uploadFile } from "@/app/api/uploadRekomendasi";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadFile } from "@/app/api/uploadRekomendasi/route";
import { getUserSession } from "@/app/api/getUserSession/route";
import { useSession } from "next-auth/react";
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
const Updateprofileform = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [no_sk, Nosk] = useState("");
  const [alamat, setAlamat] = useState("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.email) {
          const usersData = await getUserSession(session.user.email);
          // Penanganan nilai null di sini
          setUsers(usersData || []); // Jika usersData null, berikan array kosong
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [session]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="space-y-12">
        <div className="pb-12">
          <form onSubmit={onSubmit}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nama
                </label>
                <div className="mt-2">
                  <Input
                    onChange={(e) => setNama(e.target.value)}
                    value={nama}
                    type="text"
                    name="nama"
                    id="nama"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  email
                </label>
                <div className="mt-2">
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="no_sk"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  No Sk
                </label>
                <div className="mt-2">
                  <Input
                    onChange={(e) => Nosk(e.target.value)}
                    value={no_sk}
                    type="text"
                    name="no_sk"
                    id="no_sk"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="alamat"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Alamat
                </label>
                <div className="mt-2">
                  <Input
                    onChange={(e) => setAlamat(e.target.value)}
                    value={alamat}
                    type="text"
                    name="alamat"
                    id="alamat"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <button
                type="submit"
                className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-green-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
        <p>{message}</p>
      </div>
    </>
  );
};

export default Updateprofileform;
