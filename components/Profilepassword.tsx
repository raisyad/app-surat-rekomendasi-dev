import React from "react";
import Link from "next/link";
import Updatepasswordform from "./Updatepasswordform.tsx";

const Profilepassword = () => {
  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        <div className="">
          <img src="/file/nadhief.jpg" alt="" />
          <div className="pt-4 pb-2">
            <Link
              href="/admin/profile"
              className=" inline-flex items-center w-full justify-center  px-4 py-2 text-base font-medium text-green-800 shadow-sm hover:bg-green-100"
            >
              Ubah Profile
            </Link>
          </div>
          <div>
            <Link
              href="admin/profile/password"
              className="inline-flex items-center w-full justify-center  px-4 py-2 text-base font-medium text-green-800 shadow-sm hover:bg-green-100"
            >
              Ubah Password
            </Link>
          </div>
        </div>
        <div className="col-span-4 border border-gray-300 rounded-md pl-10">
          <Updatepasswordform></Updatepasswordform>
        </div>
      </div>
    </div>
  );
};

export default Profilepassword;
