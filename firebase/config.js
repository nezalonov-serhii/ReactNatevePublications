import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyDVh7Q3mrBOv0tfjMFL8jf7gKDqwQH1ZzI",
   authDomain: "reactnatevepublications-ae82c.firebaseapp.com",
   projectId: "reactnatevepublications-ae82c",
   storageBucket: "reactnatevepublications-ae82c.appspot.com",
   messagingSenderId: "644012244492",
   appId: "1:644012244492:web:9e215887923b58b6f1f829",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
