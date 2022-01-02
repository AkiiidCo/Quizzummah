import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth.slice';
import settings from './settings.slice';
import game from './game.slice';

export default combineReducers({
	auth,
	settings,
	game,
});
