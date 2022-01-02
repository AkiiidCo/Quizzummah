import { createSlice } from '@reduxjs/toolkit';
import template from '../template';

const settingsSlice = createSlice({
	name: 'settings',
	initialState: { ...template.settings },
	reducers: {
		changeLanguage(state, action: { payload: string }) {
			state.language = action.payload;
		},
	},
});

export const { changeLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;
