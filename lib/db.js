import { getDatabase, ref, push, set, serverTimestamp } from "firebase/database";
import firebaseApp from '../lib/firebase';

const database = getDatabase(firebaseApp);
export function insertPrompt(data) {

    const db = getDatabase();
    const postListRef = ref(db, '_queue');
    const newPostRef = push(postListRef);
    set(newPostRef, {
        ...data,
        status: 'pending',
        timestamp: serverTimestamp()
    });
}