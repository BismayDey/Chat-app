import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVABTHjbFp0xk1vie5jnBpeAoD4bNmHk4",
  authDomain: "chatapp-73f32.firebaseapp.com",
  databaseURL: "https://chatapp-73f32-default-rtdb.firebaseio.com/",
  projectId: "chatapp-73f32",
  storageBucket: "chatapp-73f32.appspot.com",
  messagingSenderId: "344096740116",
  appId: "1:344096740116:web:9d2eafab2e30cf46e5e801",
  measurementId: "G-4XMBH3B3L4",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
