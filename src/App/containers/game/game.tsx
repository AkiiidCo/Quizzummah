import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import WSManager, { WSStatus } from '../../managers/ws.manager';
import { updateStatus } from '../../redux/slices/game.slice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { GameWaitScreen } from './game-wait';
import { GameQuestionScreen } from './game-question';
import { GameIntermissionScreen } from './game-intermission';
import { GameResultsScreen } from './game-results';

export enum GamePage {
	WAIT = 'wait',
	QUESTION = 'question',
	INTERMISSION = 'intermission',
	RESULTS = 'results',
}

export const Game = () => {
	const navigation = useNavigate();
	const location = useLocation();
	const gameToken = useAppSelector((state: RootState) => state.game.gameToken);
	const [page, setPage] = useState<GamePage>(GamePage.WAIT);
	const [players, setPlayers] = useState<string[]>([]);
	const [gameState, setGameState] = useState<any>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setPlayers(location.state?.players ?? []);
		setPage(location.state?.page ?? GamePage.WAIT);

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
		switch (message.eventName) {
			case 'gamestate':
				if (message.page) {
					setPage(message.page);
				}
				setGameState(message);
				break;
			case 'gamejoin':
			case 'gameleave':
				setPlayers(message.players);
				break;
			default:
				break;
		}
	};

	return gameState && page === GamePage.QUESTION ? (
		<GameQuestionScreen gameState={gameState} />
	) : gameState && page === GamePage.INTERMISSION ? (
		<GameIntermissionScreen gameState={gameState} />
	) : gameState && page === GamePage.RESULTS ? (
		<GameResultsScreen gameState={gameState} />
	) : (
		<GameWaitScreen players={players} />
	);
};
