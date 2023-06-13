// acciones a las que les puedo hacer dispatch y esas acciones internamente tienen una tarea asincrona

import { checkingCredentials, login, logout } from './';
import {
	loginWithEmailPassword,
	logoutFirebase,
	registerUserWithEmailPassword,
	singInWithGoogle,
} from '../../firebase/providers';

import { clearNotesLogout } from '../journal';

export const checkingAuthentication = (email, password) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
	};
};

export const startGoogleSignIn = () => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const result = await singInWithGoogle();
		if (!result.ok) return dispatch(logout(result));

		dispatch(login(result));
	};
};

// Para crear login with email and password
export const startCreatingUserWithEmailPassword = ({
	email,
	password,
	displayName,
}) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());

		const { ok, uid, photoURL, errorMessage } =
			await registerUserWithEmailPassword({
				email,
				password,
				displayName,
			});

		if (!ok) return dispatch(logout({ errorMessage }));

		dispatch(login({ uid, displayName, email, photoURL }));
	};
};

// Para iniciar sesión
export const startLoginWithEmailPassword = (emailUser, password) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const { ok, uid, photoURL, email, errorMessage, displayName } =
			await loginWithEmailPassword(emailUser, password);

		if (!ok) return dispatch(logout({ errorMessage }));

		dispatch(login({ ok, uid, photoURL, email, displayName }));
	};
};

// Para cerrar sesion
export const startLogout = () => {
	return async (dispatch) => {
		await logoutFirebase();
		dispatch(clearNotesLogout());
		dispatch(logout());
	};
};
