import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3A9t_PjXPzzIEQc09wpVkGgJyfGJCsoE",
  authDomain: "kitchen-c57fa.firebaseapp.com",
  projectId: "kitchen-c57fa",
  storageBucket: "kitchen-c57fa.appspot.com",
  messagingSenderId: "409830792575",
  appId: "1:409830792575:web:d7aefdf3dc0c1ef2a0ce4a",
  measurementId: "G-6Y4F1KQ37Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
