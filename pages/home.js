import React from 'react'
import Sidebar from '../components/Sidebar';
import { useItems, useLatestItem } from '../hooks/useItems';

export default function Home() {
    
    const [latestItem, loadingLatest, errorLatest] = useLatestItem();
    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{flex: 4}} className="p-4">
                <Sidebar />
            </div>
            <div style={{flex: 9, backgroundColor: "gray", display: "flex", alignItems: "center", flexDirection: "column"}}>
                <img src={latestItem?.url}
                alt="image description" style={{height: "100vh"}}/>
            </div>
            <div style={{flex: 3}}>
                {"Three"}
            </div>
        </div>
    )
}
