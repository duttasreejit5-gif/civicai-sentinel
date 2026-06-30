import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfG6ddb9xYKgocOzfN4yd9wHy8lIRv02s",
  authDomain: "civicai-sentinel.firebaseapp.com",
  projectId: "civicai-sentinel",
  storageBucket: "civicai-sentinel.firebasestorage.app",
  messagingSenderId: "785007665227",
  appId: "1:785007665227:web:da25d4c73e0ed479306dce",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);