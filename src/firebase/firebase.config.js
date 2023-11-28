
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCSv4YaYIApo9QTfRjeymZY0MAjo8sH2A",
  authDomain: "cms-project-2fbca.firebaseapp.com",
  projectId: "cms-project-2fbca",
  storageBucket: "cms-project-2fbca.appspot.com",
  messagingSenderId: "833102592557",
  appId: "1:833102592557:web:73c1a0ef96add401ee56a4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();