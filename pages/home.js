import React from 'react'
import RecentImages from '../components/RecentImages';
import Sidebar from '../components/Sidebar';
import { useItems, useLatestItem } from '../hooks/useItems';

export default function Home() {

    const [latestItem, loadingLatest, errorLatest] = useLatestItem();
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 4 }} className="p-4">
                <img src="/logo.png" alt=""  className='m-4 ml-2'/>
                <Sidebar />
                <img src="/qr.png" alt="" style={{
                    position: "absolute",
                    bottom: 0,
                    width: "300px"
                }} />
            </div>
            <div style={{ flex: 9, backgroundColor: "gray", display: "flex", alignItems: "center", flexDirection: "column" }}>
                <img src={latestItem?.url}
                    alt="image description" style={{ height: "100vh" }} />
                <div style={{
                    display: "relative",
                    
                }}>
                    <div className='bg-black flex-grow' style={{
                        width: "100%",
                        bottom: 10,
                    }}>
                        <p className='text-white'>{latestItem?.text}</p>
                    </div>
                </div>
            </div>
            <div style={{ flex: 3 }}>
                <RecentImages />
            </div>
        </div>
    )
}
