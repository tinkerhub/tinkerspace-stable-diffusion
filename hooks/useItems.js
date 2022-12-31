import { ref, getDatabase, orderByChild, limitToLast, query, equalTo } from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';
import firebaseApp from '../lib/firebase';
import React from 'react'
// import {equalTo} from '../node_modules/.staging/@firebase/database-dfa1a4c8/dist/index.esm2017'

const database = getDatabase(firebaseApp);
export function useItems() {
    const latestRef = query(
        ref(database, '_queue'),
        orderByChild('timestamp'),
        limitToLast(6)
    );
    const [snapshots, loading, error] = useList(latestRef);
    const [items, setItems] = React.useState([]);
    React.useEffect(() => {
        if (loading) {
            return;
        }
        if (error) {
            console.error(error);
            return;
        }
        const newItems = snapshots.map((v) => v.val());
        setItems(newItems.reverse());
    }, [loading, error, snapshots]);
    return [items, loading, error];
}

export function useLatestItem() {
    // Get records that has a value for completed_at and sort descending
    const latestRef = query(
        ref(database, '_queue'),
        orderByChild('completed_at'),
        limitToLast(1)
    );
    // const topUserPostsRef = query(ref(db, 'user-posts/' + myUserId), orderByChild('starCount'));

    const [snapshots, loading, error] = useList(latestRef);
    const [item, setItem] = React.useState(null);
    React.useEffect(() => {
        if (loading) {
            return;
        }
        if (error) {
            console.error(error);
            return;
        }
        
        snapshots && setItem(snapshots[0]?.val());
        // setItem(snapshots.map((v) => v.val().text));
    }
        , [loading, error, snapshots]);
        console.log(item,'itemitemitem');
    return [item, loading, error];

}