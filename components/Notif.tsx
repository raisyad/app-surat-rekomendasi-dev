import React from 'react'

const Mail = () => {
  return (
    <div>
      <div className="lg:grid lg:grid-cols-6 gap-4">
          <div className="border rounded-lg border-gray-400 p-4 col-end-5 col-span-2">
            <div className="flex justify-around justify-center align-center h-full">
              <div className="">
                <p className="text-5xl">0</p>
                <p className="text-xl">Total Pesan</p>
              </div>
              <div className="flex items-center justify-center align-center h-full">
                <img src="/message1.png" alt="" />   
              </div>
            </div>
          </div>
          <div className="col-end-7 col-span-2 pt-6 lg:pt-0">
          <div className="border rounded-lg border-gray-400 p-4 col-end-5 col-span-2">
            <div className="flex justify-around justify-center align-center h-full">
              <div className="">
                <p className="text-5xl">0</p>
                <p className="text-xl">Pesan Baru</p>
              </div>
              <div className="flex items-center justify-center align-center h-full">
                <img src="/message2.png" alt="" />   
              </div>
            </div>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Mail
