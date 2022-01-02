import { createSlice } from '@reduxjs/toolkit';
import { WSStatus } from '../../managers/ws.manager';
import template from '../template';

const gameSlice = createSlice({
	name: 'game',
	initialState: { ...template.game },
	reducers: {
		updateStatus(state, action: { payload: WSStatus }) {
			state.status = action.payload;
		},
		updateGame(state, action: { payload: any }) {
			state.gameToken = action.payload.gameToken;
			state.gameId = action.payload.gameId;
			state.room = action.payload.room;
			state.username = action.payload.username;
			state.host = action.payload.host;
		},
	},
});

export const { updateStatus, updateGame } = gameSlice.actions;

export default gameSlice.reducer;
