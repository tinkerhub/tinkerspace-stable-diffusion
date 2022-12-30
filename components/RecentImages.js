import React from 'react'
import { useItems } from '../hooks/useItems';

export default function RecentImages() {
    const [items, loading, error] = useItems();
    return (
        <div className='p-2'>
            <h1>Recent Images</h1>
            {
                loading ? <p>Loading...</p> : error ? <p>Error</p> : items.map((item, index) => {
                    return <img className='m-2' src={item.url} alt="image description" />
                })
            }

        </div>
    )
}
