import React from 'react'
function Item() {
  return (<div>
    <span>PsBots</span>
    <p>a melting Roman numeral clock, behind a red and black gradient background, dynamic lighting, photorealistic fantasy concept a...

    </p>
  </div>)
}
function Line() {
  return <div className='mt-6 w-full h-0.5 bg-[#BDBDBD]' />
}
function QRcode() {
  return (<div className='basis-3 text-center items-center flex flex-col'>
    <Line />
    <img src='/qr-plain.svg' className='h-64 self-center' alt='QR' />
    <span className='text-lg  font-semibold text-[#212121]'>Scan QR and share your imagination</span>
  </div>);
}
function RecentItems() {
  return (<div>
    <h1 class="text-lg text-center ">Imagination Queue</h1>
    <Item />
    <Item />
    <Item />
    <Item />
    <Item />
    <Item />
  </div>
  )
}

function Sidebar() {
  return (
    <div class="flex h-screen flex-col bg-gray-300 px-6">
      <div class="py-8 ">
        <img src="/logo.png" />
        <Line />
      </div>
      <div class="basis-full overflow-scroll mx-4 ">
        <RecentItems />
      </div>
      <div>
        <QRcode />
      </div>
    </div>);
}
function CurrentImage() {
  return <div className='relative'>
    <img src="https://storage.googleapis.com/tinkerspace-stable-diffusion.appspot.com/27fefdf3-f5a5-4fa5-a476-55479d35adbe.png" />
    <div className='absolute bg-[#212121] bg-opacity-80 bottom-0 w-full p-4'>
      <p className='text-white text-lg'> Hello text</p>
    </div>
  </div>
}

export default function Layout() {
  return (
    <div class="flex h-screen flex-row">
      <div class="basis-[25%]">
        <Sidebar />
      </div>
      <div class="basis-[55%]">
        <CurrentImage />
      </div>
      <div class="basis-[20%] bg-green-100">
        
      </div>
    </div>

  )
}
