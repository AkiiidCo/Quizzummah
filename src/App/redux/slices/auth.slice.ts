import { createSlice } from '@reduxjs/toolkit';
import template from '../template';

const authSlice = createSlice({
	name: 'auth',
	initialState: { ...template.auth },
	reducers: {
		updateAuthInfo(state, action: { payload: { host: string; port: number; token: string; premium?: boolean } }) {
			state.signedIn = true;
		},
		softSignOut(state) {
			state.signedIn = false;
		},
		signOut(state) {
			state.signedIn = false;
		},
	},
});

export const { updateAuthInfo, softSignOut, signOut } = authSlice.actions;

export default authSlice.reducer;
