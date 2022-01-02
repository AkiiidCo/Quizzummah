import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import WSManager, { WSStatus } from '../../managers/ws.manager';
import { updateStatus } from '../../redux/slices/game.slice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { GameIntermissionScreen } from './game-intermission';
import { GameQuestionScreen } from './game-question';
import { GameResultsScreen } from './game-results';
import { GameWaitScreen } from './game-wait';

export enum GameScreen {
	WAIT = 'wait',
	QUESTION = 'question',
	RESULTS = 'results',
}

export const Game = (): ReactElement => {
	const navigation = useNavigate();
	const status = useAppSelector((state: RootState) => state.game.status);
	const host = useAppSelector((state: RootState) => state.game.host);
	const gameToken = useAppSelector((state: RootState) => state.game.gameToken);
	const [screen, setScreen] = useState<GameScreen>(GameScreen.WAIT);
	const [question, setQuestion] = useState<any>(null);
	const [gameState, setGameState] = useState<any>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!gameToken) {
			navigation('/');
		} else {
			WSManager.connect();
			WSManager.addListener('status', (newStatus: WSStatus) => dispatch(updateStatus(newStatus)));
			WSManager.addListener('message', handleMessage);
		}

		return () => {
			WSManager.disconnect();
			WSManager.removeAllListeners();
		};
	}, []);

	const handleMessage = (message: any) => {
		console.log('handleMessage: ', message);
		if (message.eventName === 'gamestate') {
			setGameState(message);
			if (message.page) {
				// if (message.page === 'question') {
				// 	setQuestion(message.question[0]);
				// }
				setScreen(message.page);
			}
		}
		// if (message.event === 'state') {
		// 	dispatch(updateStates(message.body));
		// } else if (message.type === 'chat') {
		// 	dispatch(updateChatList(message.data));
		// 	if (store.getState().settings.vibrateOnMessage) {
		// 		Vibration.vibrate();
		// 	}
		// }
	};

	switch (screen) {
		case GameScreen.WAIT:
			return <GameWaitScreen gameState={gameState} />;
		// case GameScreen.INTERMISSION:
		// 	return <GameIntermissionScreen />;
		case GameScreen.QUESTION:
			return <GameQuestionScreen gameState={gameState} />;
		case GameScreen.RESULTS:
			return <GameResultsScreen gameState={gameState} />;
	}
};
