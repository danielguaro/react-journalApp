import { login, logout } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';

import { FirebaseAuth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { startLoadingNotes } from '../store/journal';
import { useEffect } from 'react';

export const useCheckAuth = () => {
	const { status } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, async (user) => {
			if (!user) return dispatch(logout());
			const { uid, email, displayName, photoURL } = user;
			dispatch(login({ uid, email, displayName, photoURL }));
			dispatch(startLoadingNotes());
		});
	}, []);

	return status;
};