import { authSlice } from './auth';
import { configureStore } from '@reduxjs/toolkit';
import { journalSlice } from './journal';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		journal: journalSlice.reducer,
	},
});
