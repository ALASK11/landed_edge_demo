// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBTIaRike9w4GuUMdp8UdQzEX0jz3C6WH0",
  authDomain: "plexiform-style-452205-h7.firebaseapp.com",
  projectId: "plexiform-style-452205-h7",
  storageBucket: "plexiform-style-452205-h7.firebasestorage.app",
  messagingSenderId: "456981226486",
  appId: "1:456981226486:web:d2cb4bcc88f83e0a009dd7",
  measurementId: "G-BEG13VVPV4",
}

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
