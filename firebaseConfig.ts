import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase project configuration
// You can get this from the Firebase Console -> Project Settings -> General
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Simple check to warn developers if they haven't set up Firebase yet
if (firebaseConfig.apiKey === "YOUR_API_KEY_HERE") {
  console.warn(
    "%c FIREBASE CONFIG MISSING ", 
    "background: red; color: white; font-weight: bold; padding: 4px;",
    "Please update firebaseConfig.ts with your actual Firebase project details to use Auth and Database features."
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;