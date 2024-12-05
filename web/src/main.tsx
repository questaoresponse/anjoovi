import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import './d.ts';
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDYAbBBZeg4BR4h8GuaJTbNpxNvljgv0uY",
//   authDomain: "anjoovi-6626.firebaseapp.com",
//   projectId: "anjoovi-6626",
//   storageBucket: "anjoovi-6626.appspot.com",
//   messagingSenderId: "1077283999057",
//   appId: "1:1077283999057:web:113d9ab7aa270fd6b25770"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
// serviceWorker.register();
// export function register(config) {
  // }