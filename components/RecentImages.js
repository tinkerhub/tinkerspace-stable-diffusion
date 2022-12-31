import React from 'react';
import { useRecentImages } from '@hooks/index';

export default function RecentImages() {
  const [items, loading, error] = useRecentImages();
  return (
    <div className='w-[25%] h-screen overflow-y-scroll p-10'>
      <h2 className='text-2xl font-semibold'>Previous</h2>
      {loading && <p className='mt-5 text-lg'>Loading ...</p>}
      {error && <p className='mt-5 text-lg'>Error</p>}
      {items &&
        items.map((item, idx) => {
          return (
            <img
              key={idx}
              src={item?.url}
              className='mt-5 w-full'
              alt={item?.text}
            />
          )
        })}
    </div>
  );
}
