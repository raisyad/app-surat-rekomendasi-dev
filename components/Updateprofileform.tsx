"use client";
// import { uploadFile } from "@/app/api/uploadRekomendasi";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadFile } from "@/app/api/uploadRekomendasi/route";
import { getUserSession } from "@/app/api/getUserSession/route";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
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
  const { push } = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [no_sk, Nosk] = useState("");
  const [alamat, setAlamat] = useState("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // console.log("INI UPDATE PROPIL");
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

  useEffect(() => {
    // Inisialisasi nilai input berdasarkan data pengguna yang diterima
    if (users.length > 0) {
      const user = users[0];
      setNama(user.nama || "Loading...");
      setEmail(user.email || "Loading...");
      setOldEmail(user.email || "Loading...");
      Nosk(user.no_sk || "Loading...");
      setAlamat(user.alamat || "Loading...");
    }
  }, [users]);

  // Mendefinisikan tipe data untuk formData
  interface FormData {
    email?: string;
    oldEmail?: string;
    nama: string;
    no_sk: string;
    alamat: string;
  }

  const handleClickUpdate = async (formData: FormData) => {
    try {
      const response = await fetch('/api/updateUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Data sudah ada');
      }

      const responseData = await response.json();

      // Check if update falls into HEY 1 or HEY 2 condition
      if (email.toString() !== oldEmail.toString()) {
        // HEY 1
        push("/signout");  // Redirect to /signout on success
      } else {
        // HEY 2
        push("/user/dashboards");  // Redirect to /user/dashboard on success
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");

    // Inisialisasi formData di luar blok kondisional
    let formData: FormData;

    // Mengecek apakah email saat ini berbeda dengan oldEmail
    if (email.toString() !== oldEmail.toString()) {
      console.log("HEY 1");
      // Jika berbeda, masukkan email ke dalam formData
      formData = {
        email: email.toString(),
        oldEmail: oldEmail.toString(),
        nama: nama.toString(),
        no_sk: no_sk.toString(),
        alamat: alamat.toString(),
      };
    } else {
      console.log("HEY 2");
      // Jika sama, formData tidak mengandung email
      formData = {
        email: email.toString(),
        oldEmail: oldEmail.toString(),
        nama: nama.toString(),
        no_sk: no_sk.toString(),
        alamat: alamat.toString(),
      };
      console.log(formData);
    }

    // Lakukan sesuatu dengan formData (misalnya, kirim ke server)
    handleClickUpdate(formData);
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
