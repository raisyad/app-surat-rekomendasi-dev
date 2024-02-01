import React from "react";
const message = [
  {
    subjek:
      "Surat Rekomendasi Pelatihan Kemahasiswaan UNIVERSITAS PENDIDIKAN INDONESIA",
    tanggal: "13 Juli 2022, 06:42 PM",
  },
  {
    subjek: "Surat Rekomendasi Pelatihan Kemahasiswaan UNIVERSITAS PADJAJARAN",
    tanggal: "13 Juli 2022, 06:42 PM",
  },
  {
    subjek:
      "Surat Rekomendasi Pelatihan Kemahasiswaan UNIVERSITAS PENDIDIKAN INDONESIA",
    tanggal: "13 Juli 2022, 06:42 PM",
  },
];
const Message = () => {
  return (
    <div>
      {message.map((msg, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-4 p-2 border border-gray-400 rounded-xl my-2"
        >
          <div className="col-span-3 ">
            <div className="flex gap-4">
              <img src="/file.png" className="h-5 w-5" alt="" />
              <h3 className="truncate">{msg.subjek}</h3>
            </div>
          </div>
          <div className="flex justify-end truncate">
            <p>{msg.tanggal}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
