import { useItems } from '@hooks/useItems';

export default function Sidebar() {
  const [items, loading, error] = useItems();

  return (
    <div className='flex flex-col justify-between w-[30%] h-screen p-10 bg-[#E0E0E0]'>
      <img src='/logo.png' alt='' className='w-5/6' />

      <div>
        <h1 className='text-xl font-semibold text-[#212121]'>In Queue</h1>
        {loading && <p className='mt-6 text-lg'>Loading ...</p>}
        {error && <p className='mt-6 text-lg'>Error</p>}
        {items &&
          items.map((item, idx) => {
            if (idx > 2) return null;
            return (
              <div key={idx} className='mt-6'>
                <h2 className='text-lg font-bold text-[#212121]'>PSBots</h2>
                <p className='mt-3 text-[#212121] opacity-80'>{item.text}</p>
                <div className='mt-3 flex items-center rounded-full py-1 px-3 border-2 w-fit border-[#828282]'>
                  <div
                    className={`${
                      (item.status == 'processed' ||
                        item.status === 'completed') &&
                      'bg-green-600'
                    } ${
                      (item.status == 'pending' ||
                        item.status === 'processing') &&
                      'bg-orange-400'
                    }   rounded-full w-3 h-3`}
                  />
                  <h2 className='ml-2 text-[#333333] font-medium'>
                    {item.status[0].toUpperCase() + item.status.slice(1)}
                  </h2>
                </div>
              </div>
            );
          })}
      </div>

      <div className='mt-6 w-full h-0.5 bg-[#BDBDBD]' />
      <img src='/qr.svg' />
    </div>
  );
}
