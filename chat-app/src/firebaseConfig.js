// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAVABTHjbFp0xk1vie5jnBpeAoD4bNmHk4",
  authDomain: "chatapp-73f32.firebaseapp.com",
  projectId: "chatapp-73f32",
  storageBucket: "chatapp-73f32.appspot.com",
  messagingSenderId: "344096740116",
  appId: "1:344096740116:web:9d2eafab2e30cf46e5e801",
  measurementId: "G-4XMBH3B3L4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
