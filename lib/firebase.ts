// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD06Lx1JxA3OycT-Qe6u71o43Ew0XmPzJc",
  authDomain: "iamgovind-com.firebaseapp.com",
  projectId: "iamgovind-com",
  storageBucket: "iamgovind-com.firebasestorage.app",
  messagingSenderId: "283421390982",
  appId: "1:283421390982:web:b821a9bc3c4c71a5e9b907",
  measurementId: "G-6HTKLYKEJG",
};
// Initialize Firebase (prevent re-initialization in Next.js hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export { app };