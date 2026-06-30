import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export async function testFirestore() {
  console.log("Testing Firestore...");
  console.log("DB:", db);

  try {
    const docRef = await addDoc(collection(db, "test"), {
      message: "Hello World",
    });

    console.log("Firestore works!", docRef.id);
  } catch (error) {
    console.error("TEST ERROR:", error);
  }

  console.log("Finished test");
}