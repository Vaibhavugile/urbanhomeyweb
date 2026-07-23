import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyALksl6qc-ht2ArInPE2xA-q_7b7MgjwjU",
  authDomain: "urbanhomey-363dc.firebaseapp.com",
  projectId: "urbanhomey-363dc",
  storageBucket: "urbanhomey-363dc.firebasestorage.app",
  messagingSenderId: "449162847594",
  appId: "1:449162847594:web:96365101b00730ac527113",
  measurementId: "G-09Z250TQ76"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);