// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8xHfkJfMr0p5LQyXpJ0eCgcX9DNoTf4U",
  authDomain: "blog-platform-react.firebaseapp.com",
  projectId: "blog-platform-react",
  storageBucket: "blog-platform-react.appspot.com",
  messagingSenderId: "800626228850",
  appId: "1:800626228850:web:280aea5417235de2f9cceb",
  measurementId: "G-NE19P3JCBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app)

export { app, analytics, auth, db }