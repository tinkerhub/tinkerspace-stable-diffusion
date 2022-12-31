import React from 'react';
import RecentImages from '@components/beta/RecentImages';
import Sidebar from '@components/beta/Sidebar';
import { useLatestItem } from '@hooks/useItems';

export default function Home() {
  const [latestItem, loadingLatest, errorLatest] = useLatestItem();

  return (
    <div className='flex items-center w-full'>
      <Sidebar />
      <div className='w-full relative'>
        {loadingLatest && <div className='text-lg p-5'>Loading ...</div>}
        {errorLatest && <div className='text-lg p-5'>Error</div>}
        {latestItem && (
          <img
            src={latestItem?.url}
            alt=''
            className='w-full h-screen object-cover'
          />
        )}
        {latestItem && (
          <div className='absolute w-full bottom-0 p-5 bg-black bg-opacity-80'>
            <p className='text-white text-lg'>{latestItem?.text}</p>
          </div>
        )}
      </div>
      <RecentImages />
    </div>
  );
}
