"use client";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className=" h-[360px]">
        <img className="w-full h-full" src="bglanding2.png" alt="" />
      </div>
      <div className="mx-auto max-w-7xl text-center mt-14">
        <div className="text-center mt-8">
          <h1 className="text-3xl">Tentang Aplikasi</h1>
        </div>
        <div className="mx-auto flex-col max-w-xl sm:max-w-5xl px-4 py-5 sm:px-6 sm:py-4 md:space-x-10 lg:px-8 border rounded-lg shadow-lg mt-4 flex items-start">
          <div className="sm:ml-20 sm:mt-4 sm:mb-4">
            <h1 className="text-2xl font-bold">Aplikasi Surat Rekomendasi</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="sm:w-1/2 text-start">
              <h1 className="text-green-700 font-semibold text-xl font-bold">
                Apa itu Surat Rekomendasi?
              </h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div className="sm:w-1/2 flex justify-center">
              <img src="hero.png" className="w-72 h-72" alt="" />
            </div>
          </div>
        </div>
        <div className="pt-14">
          <p className="text-3xl text-center">Statistik</p>
          <p className="text-center pt-4">
            Aplikasi Pembuatan Surat Rekomendasi
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 p-8">
          <div className="flex-grow mx-auto rounded-xl min-h-64 shadow-md flex flex-col border rounded-lg border-gray-400 shadow-lg">
            <div className="p-3 flex-grow text-center flex-col items-center justify-center">
              <p className="text-green-700 font-semibold text-7xl text-7xl font-bold pt-10">
                90
              </p>
              <p className="text-black text-xl">
                Rekomendasi yang telah diterbitkan
              </p>
            </div>
          </div>
          <div className=" flex-grow mx-auto rounded-xl min-h-64 shadow-md flex flex-col border rounded-lg border-gray-400 shadow-lg">
            <div className="p-3 flex-grow text-center">
              <p className="text-green-700 font-semibold text-7xl text-7xl font-bold pt-10">
                60
              </p>
              <p className="text-black text-xl">
                Surat rekomendasi yang ditolak
              </p>
            </div>
          </div>
          <div className=" flex-grow mx-auto rounded-xl min-h-64 shadow-md flex flex-col border rounded-lg border-gray-400 shadow-lg">
            <div className="p-3 flex-grow text-center">
              <p className="text-green-700 font-semibold text-7xl text-7xl font-bold pt-10">
                15
              </p>
              <p className="text-black text-xl">
                Statistik dalam proses Pemeriksaan
              </p>
            </div>
          </div>
          <div className=" flex-grow mx-auto rounded-xl min-h-64 shadow-md flex flex-col border rounded-lg border-gray-400 shadow-lg">
            <div className="p-3 flex-grow text-center">
              <p className="text-green-700 font-semibold text-7xl text-7xl font-bold pt-10">
                100
              </p>
              <p className="text-black text-xl">
                Statistik dalam proses Pemeriksaan
              </p>
            </div>
          </div>
        </div>
        <div className="pt-16">
          <p className="text-3xl text-center">Panduan</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-32 items-center justify-center">
          <div className="sm:w-1/2 flex justify-end">
            <img src="hero.png" className="w-72 h-72" alt="" />
          </div>
          <div className="sm:w-1/2 flex justify-start">
            <img src="hero.png" className="w-72 h-72" alt="" />
          </div>
        </div>
        <div className="pt-20">
          <p className="text-3xl text-center">FAQ</p>
        </div>
        <div className="mx-auto flex-col max-w-xl sm:max-w-5xl px-4 py-5 sm:px-6 sm:py-4 md:space-x-10 lg:px-8 mt-4 flex items-start">
          <div className="sm:ml-20 sm:mt-4 sm:mb-4"></div>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="sm:w-1/2 text-start">
              <h1 className="text-green-700 font-semibold text-xl pt-4 pb-4">
                Apa itu Surat Rekomendasi?
              </h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div className="sm:w-1/2 text-start">
              <h1 className="text-green-700 font-semibold text-xl font-bold pt-4 pb-4">
                Apa itu Surat Rekomendasi?
              </h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="sm:w-1/2 text-start">
              <h1 className="text-green-700 font-semibold text-xl font-bold pt-4 pb-4">
                Apa itu Surat Rekomendasi?
              </h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div className="sm:w-1/2 text-start">
              <h1 className="text-green-700 font-semibold text-xl font-bold pt-4 pb-4">
                Apa itu Surat Rekomendasi?
              </h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Home;
