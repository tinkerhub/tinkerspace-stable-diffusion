import { ref, orderByChild, limitToLast, query, equalTo, startAt, limitToFirst, onValue, get } from 'firebase/database';
import { useList, useListVals } from 'react-firebase-hooks/database';
import React, { use, useEffect, useState } from 'react'
import { queueRef } from '@lib/firebase';

export function useItems({
    limit = 6,
}) {
    const latestRef = query(
        queueRef,
        orderByChild('completed_at'),
        limitToLast(limit)
    );
    const [items, loading, error] = useListVals(latestRef);
    return [items, loading, error];
}

export function useRecentImages() {
    const [items, loading, error] = useItems({ limit: 8 });
    const [images, setImages] = useState([]);
    useEffect(() => {
        if(items.length > 0) {
            // remove last item 
            const newImages = items.slice(0, -1);
            // reverse order
            newImages.reverse();
            setImages(newImages);
        }
    }, [items]);

    return [images, loading, error];
}

export function useRecentQueue() {
    const latestRef = query(
        queueRef,
        orderByChild('timestamp'),
        limitToLast(6)
    );
    const [items, loading, error] = useListVals(latestRef);
    const [reverseItems, setReverseItems] = useState([]);

    useEffect(() => {
        if (items.length > 0) {
            setReverseItems(items.reverse());
        }
    }, [items]);
    return [reverseItems, loading, error];
}

export function useLatestItem() {
    const [item, setItem] = React.useState(null);
    async function sync(params) {
        const latestRef = query(
            queueRef,
            orderByChild('expiry_at'),
            startAt(new Date().getTime()),
            limitToFirst(1)
        );

        const snapshot = await get(latestRef);
        const data = snapshot.val();
        if (data != null)
           { setItem(Object.values(data)[0])}
        else {
            const lastItemRef = query(
                queueRef,
                orderByChild('expiry_at'),
                limitToLast(1)
            );
    
            const lastItemsnapshot = await get(lastItemRef);
            const lastItemdata = lastItemsnapshot.val();
            if (lastItemdata != null)
            { setItem(Object.values(lastItemdata)[0])}
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            // setCount(count + 1);
            sync();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const loading = item == null;
    return [item, loading];

}
