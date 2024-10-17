// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID, 
// };


const firebaseConfig = {
  apiKey: "AIzaSyB8ZNw9QRgTkldCJudO2-RQdFxvqRkKvMc",
  authDomain: "react-project-411e9.firebaseapp.com",
  projectId: "react-project-411e9",
  storageBucket: "react-project-411e9.appspot.com",
  messagingSenderId: "108923891801",
  appId: "1:108923891801:web:a23a8e0c056519a2a60148"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(); //workin with authentication services

export { db, auth}; 