import { ref, getDatabase, orderByChild, limitToLast, query, equalTo } from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';
import firebaseApp from '../lib/firebase';
import React from 'react'
// import {equalTo} from '../node_modules/.staging/@firebase/database-dfa1a4c8/dist/index.esm2017'

const database = getDatabase(firebaseApp);
export function useItems() {
    const [snapshots, loading, error] = useList(ref(database, '_queue'));
    const [items, setItems] = React.useState([]);
    React.useEffect(() => {
        if (loading) {
            return;
        }
        if (error) {
            console.error(error);
            return;
        }
        setItems(snapshots.map((v) => v.val()));
    }, [loading, error, snapshots]);
    return [items, loading, error];
}
export function useLatestItem() {
    // get the latest item with status processed
    const latestRef = query(
        ref(database, '_queue'), 
        orderByChild('timestamp'),
        limitToLast(1),
        // equalTo('processes', 'status')
        // where('status','==','processed')
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
        console.log(snapshots, 'snapshots');
        snapshots && setItem(snapshots[0]?.val());
        // setItem(snapshots.map((v) => v.val().text));
    }
        , [loading, error, snapshots]);
    return [item, loading, error];

}