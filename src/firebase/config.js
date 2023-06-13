// Import the functions you need from the SDKs you need

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: '',
	authDomain: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: '',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Lineas agregadas
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
