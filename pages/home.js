import React from 'react';
import RecentImages from '@components/RecentImages';
import Sidebar from '@components/Sidebar';
import ImageSlide from '@components/ImageSlide';
export default function Home() {
  return (
    <div className='flex items-center w-full'>
        <Sidebar />
      <div className='w-full relative'>
        <ImageSlide />
      </div>
        <RecentImages />
    </div>
  );
}
