import { ref, orderByChild, limitToLast, query, equalTo, startAt, limitToFirst, onValue, get } from 'firebase/database';
import { useList, useListVals } from 'react-firebase-hooks/database';
import React, { use, useEffect, useState } from 'react'
import { queueRef, completedRef } from '@lib/firebase';

export function useCompletedItems({
    limit = 6,
}) {
    const latestRef = query(
        completedRef,
        orderByChild('completed_at'),
        limitToLast(limit)
    );
    const [items, loading, error] = useListVals(latestRef);
    return [items, loading, error];
}

export function useRecentImages() {
    const [items, loading, error] = useCompletedItems({ limit: 8 });
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
    const [items, loading, error] = useListVals(query(
        queueRef,
        orderByChild('timestamp'),
        limitToFirst(6)
    ));
    return [items, loading, error];
}

export function useLatestItem() {
    const [items, loading, error] = useCompletedItems({ limit: 1 })
    const [item, setItem] = React.useState(null);
    useEffect(() => {
        if (items.length > 0) {
            setItem(items[0]);
        }
    }, [items]);
    return [item, loading]
}
