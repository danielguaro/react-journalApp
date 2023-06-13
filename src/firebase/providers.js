import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from 'firebase/auth';

import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

// El singInWithGoogle es el que voy a mandar a llamar de mi auth/thunks.js
export const singInWithGoogle = async () => {
	try {
		// signInWithPopup recibe el auth y el rovider
		const result = await signInWithPopup(FirebaseAuth, googleProvider);
		// const credential = GoogleAuthProvider.credentialFromResult(result);
		// Obteniendo las cosas que me interesan
		const { displayName, email, photoURL, uid } = result.user;

		// Si todo sale bien
		return {
			ok: true, // Personalizado
			// user info
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (error) {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;

		return {
			ok: false,
			errorMessage,
		};
	}
};

export const registerUserWithEmailPassword = async ({
	email,
	password,
	displayName,
}) => {
	try {
		// Ocupar llegar a firebase
		const resp = await createUserWithEmailAndPassword(
			FirebaseAuth,
			email,
			password
		);
		const { uid, photoURL } = resp.user;

		// Method of firebase
		await updateProfile(FirebaseAuth.currentUser, { displayName });

		return {
			ok: true,
			uid,
			photoURL,
			email,
			displayName,
		};
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

export const loginWithEmailPassword = async (emailUser, password) => {
	try {
		const resp = await signInWithEmailAndPassword(
			FirebaseAuth,
			emailUser,
			password
		);
		const { displayName, email, photoURL, uid } = resp.user;
		return {
			ok: true,
			uid,
			photoURL,
			email,
			displayName,
		};
	} catch (error) {
		return { ok: false, errorMessage: error.message };
	}
};

export const logoutFirebase = async () => {
	return await FirebaseAuth.signOut();
};
