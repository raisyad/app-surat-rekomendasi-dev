import Sidebar from "@/components/sidebar";
import React from "react";

const page = () => {
  return (
    <div>
      <Sidebar>
        <div className="">
          <div className="pl-[45%] flex pb-4">
            <h1 className=" w-[200px] text-sm">
              Proses Surat Rekomendasi telah dilakukan pada : 2022 - 06 - 02, 13
              : 25 : 04{" "}
            </h1>
          </div>
          <div className="relative pl-[15%]">
            <div className="w-[90.4%] h-1 bg-gray-200 rounded-full"></div>
            <div className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 left-[15%] bg-green-600 rounded-full" />
            <div className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 left-1/2 bg-gray-200 rounded-full" />
            <div className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 left-3/4 bg-gray-200 rounded-full" />
            <div className="absolute top-1/2 transform -translate-y-[1] w-1 h-[250px] left-[91.5%] bg-gray-200 rounded-full" />
          </div>
          <div className="pl-[215px] gap-96 pt-4 flex">
            <h1 className="pl-6 w-[200px] text-sm">
              Diterima pada : 2022 - 06 - 02, 13 : 25 : 04
            </h1>

            <h1 className=" w-[200px] text-sm">
              Survey Lokasi Pelatihan telah dilakukan pada :
            </h1>
          </div>
        </div>
        <div className=" pt-[133px]">
          <div className="pl-[45%] flex pb-4">
            <h1 className=" w-[200px] text-sm">
              Surat Rekomendasi telah dikirim pada :
            </h1>
          </div>
          <div className="relative pl-[50%]">
            <div className="w-[83.5%] h-1 bg-gray-200 rounded-full"></div>
            <div className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 left-1/2 bg-gray-200 rounded-full" />
            <div className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 left-3/4 bg-gray-200 rounded-full" />
          </div>
          <div className="pl-[800px] gap-96 pt-4 flex">
            <h1 className=" w-[200px] text-sm">
              Balasan Surat Rekomendasi telah dilakukan pada :
            </h1>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default page;
