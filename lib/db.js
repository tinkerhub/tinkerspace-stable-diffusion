import { getDatabase, ref, push, set, serverTimestamp } from "firebase/database";
import firebaseApp, { queueRef } from '../lib/firebase';

const database = getDatabase(firebaseApp);
export function insertPrompt(data) {

    const db = getDatabase();
    const newPostRef = push(queueRef);
    set(newPostRef, {
        ...data,
        status: 'pending',
        timestamp: serverTimestamp()
    });
}