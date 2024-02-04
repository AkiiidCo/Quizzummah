import { ReactElement, useState } from 'react';
import QRequest from '../../services/QRequest';
import { RootState, useAppSelector } from '../../redux/store';
import Countdown from 'react-countdown';

export const GameIntermissionScreen = ({ gameState }: { gameState: any }): ReactElement => {
	const { host } = useAppSelector((state: RootState) => state.game);
	const [loading, setLoading] = useState(false);

	const next = async () => {
		if (host) {
			setLoading(true);
			await QRequest.get('/gamerun/proceed');
		}
	};

	const countdownRenderer = ({ minutes, seconds, completed }) => <span>{completed ? <span>Starting next question</span> : <span>{seconds < 10 ? `0${seconds}` : seconds} seconds</span>}</span>;

	return (
		<div>
			Game Intermission Screen
			{gameState.intermissionEnds && <Countdown renderer={countdownRenderer} date={gameState.intermissionEnds} onComplete={next} />}
		</div>
	);
};
