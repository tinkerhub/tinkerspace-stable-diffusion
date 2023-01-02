import { useLatestItem } from '@hooks/index';
import React from 'react'

export default function ImageSlide() {
    const [latestItem, loadingLatest, errorLatest] = useLatestItem();
    return (
        <div>
            {loadingLatest && <div className='text-lg p-5'>Loading ...</div>}
            {errorLatest && <div className='text-lg p-5'>Error</div>}
            {latestItem && (
                <img
                    src={latestItem?.url}
                    alt={latestItem?.text}
                    className='w-full h-screen object-cover'
                />
            )}
            {latestItem && (
                <div className='absolute w-full bottom-0 p-5 bg-black bg-opacity-80'>
                    {/* Make the text of size 60px in Tailwind*/}
                    <p className='text-white text-3xl'>{latestItem?.text}</p>
                </div>
            )}
        </div>
    )
}
