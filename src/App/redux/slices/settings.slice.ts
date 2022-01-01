import { createSlice } from '@reduxjs/toolkit';
import template from '../template';

const authSlice = createSlice({
	name: 'settings',
	initialState: { ...template.settings },
	reducers: {
		changeLanguage(state, action: { payload: string }) {
			state.language = action.payload;
		},
	},
});

export const { changeLanguage } = authSlice.actions;

export default authSlice.reducer;
