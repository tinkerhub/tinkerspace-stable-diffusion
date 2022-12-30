import React from 'react'
import { useItems, useLatestItem } from '../hooks/useItems';

export default function Home() {
    const [items, loading, error] = useItems();
    const [latestItem, loadingLatest, errorLatest] = useLatestItem();
    console.log(latestItem,);
    return (
        <div class="grid grid-cols-10">
            <div class="col-span-2 bg-green-300"> {error && <strong>Error: {error}</strong>}
                {loading && <span>List: Loading...</span>}
                {items && items.map((item) => <div>{JSON.stringify(item)}</div>)}</div>
            <div class="col-span-8 bg-red-300">
                {!loading? <img src={latestItem?.url} alt="logo" /> :null}
                {
JSON.stringify(latestItem,null,2)
}</div>
        </div>
    )
}
