// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIAUmEF7WEjUI6BObzaFmg5L6hplt0XCk",
  authDomain: "tinkerspace-stable-diffusion.firebaseapp.com",
  databaseURL: "https://tinkerspace-stable-diffusion-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tinkerspace-stable-diffusion",
  storageBucket: "tinkerspace-stable-diffusion.appspot.com",
  messagingSenderId: "324865100335",
  appId: "1:324865100335:web:aec37dbe55150486d514da",
  measurementId: "G-WRH4E4P1Z1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const database = getDatabase(firebaseApp);
export const queueRef = ref(database, '_queue');
export const completedRef = ref(database, '_completed');
export default firebaseApp;