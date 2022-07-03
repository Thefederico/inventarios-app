// import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firestore'

// const firebaseConfig = {

//   apiKey: "AIzaSyBuLnWyZWxTxCfYOSHYU1JSQ_o__HX5GLo",
//   authDomain: "prehormados.firebaseapp.com",
//   projectId: "prehormados",
//   storageBucket: "prehormados.appspot.com",
//   messagingSenderId: "542136692189",
//   appId: "1:542136692189:web:58796d472379f1ac951a34"

// };

// const fireApp = firebase.initializeApp(firebaseConfig);
// const auth = fireApp.auth();
// const db = fireApp.firestore();

// export default fireApp;
// export { auth, db };

//intento 2

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
// apiKey: "AIzaSyCd9GyZqiY571rURVqraPwAzAs2UqoBc34",
// authDomain: "pprehormados.firebaseapp.com",
// projectId: "pprehormados",
// storageBucket: "pprehormados.appspot.com",
// messagingSenderId: "228115978712",
// appId: "1:228115978712:web:3482d684e30e00c0f67aad",
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);

// const fireApp = firebase.initializeApp(firebaseConfig);
// const auth = fireApp.auth();
// const db = fireApp.firestore();

// export default fireApp;
// export { auth, db };

//otro intento diferente

import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCd9GyZqiY571rURVqraPwAzAs2UqoBc34",
  authDomain: "pprehormados.firebaseapp.com",
  projectId: "pprehormados",
  storageBucket: "pprehormados.appspot.com",
  messagingSenderId: "228115978712",
  appId: "1:228115978712:web:3482d684e30e00c0f67aad",
};

const fireApp = firebase.initializeApp(firebaseConfig);
const auth = fireApp.auth();
const db = fireApp.firestore();

export default fireApp;
export { auth, db };
