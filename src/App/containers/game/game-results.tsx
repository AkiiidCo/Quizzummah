import { ReactElement, useEffect, useState } from 'react';
import { GamesAnswersNextBtnWrapper } from './game.styles';
import { QUButton } from '../../components/qu-button/qu-button';
import { useNavigate } from 'react-router';
import WSManager from '../../managers/ws.manager';

export const GameResultsScreen = ({ gameState }: { gameState: any }): ReactElement => {
	const navigation = useNavigate();
	const [showResults, setShowResults] = useState(false);

	useEffect(() => {
		sessionStorage.removeItem('gameToken');
		WSManager.disconnect();
		WSManager.removeAllListeners();
		const audio = new Audio('/assets/audio/epic-hybrid.mp3');
		audio.volume = 0.5;
		audio.play();
		const resultsTimeout = setTimeout(() => {
			setShowResults(true);
		}, 2000);

		return () => {
			clearTimeout(resultsTimeout);
		};
	}, []);

	const home = () => {
		navigation('/');
	};

	return (
		<div>
			<div>Game Results Screen</div>

			<div>
				<div>Scores:</div>
				{showResults &&
					Object.keys(gameState.scores).map((player, index) => (
						<div>
							Place {index + 1}: {player} - {gameState.scores?.[player] ?? 0}
						</div>
					))}
			</div>

			<GamesAnswersNextBtnWrapper>
				<QUButton onClick={home} title={'Home'} />
			</GamesAnswersNextBtnWrapper>
		</div>
	);
};
