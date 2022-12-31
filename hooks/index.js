import { ref, orderByChild, limitToLast, query, equalTo } from 'firebase/database';
import { useList, useListVals } from 'react-firebase-hooks/database';
import React, { use, useEffect,useState } from 'react'
import { database } from '@lib/firebase';

export function useItems({
    limit = 6,
}) {
    const latestRef = query(
        ref(database, '_queue'),
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
        ref(database, '_queue'),
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
    const [
        items,
        loading,
        error,
    ] = useItems({ limit: 1 });
    const [item, setItem] = useState(null);
    useEffect(() => {
        if (items.length > 0) {
            setItem(items[0]);

        }
    }, [items]);
    return [item, loading, error];

}