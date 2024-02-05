import { ReactElement, useEffect } from 'react';
import { GamesAnswersNextBtnWrapper } from './game.styles';
import { QUButton } from '../../components/qu-button/qu-button';
import { useNavigate } from 'react-router';
import WSManager from '../../managers/ws.manager';

export const GameResultsScreen = ({ gameState }: { gameState: any }): ReactElement => {
	const navigation = useNavigate();

	useEffect(() => {
		sessionStorage.removeItem('gameToken');
		WSManager.disconnect();
		WSManager.removeAllListeners();
	}, []);

	const home = () => {
		navigation('/');
	};

	return (
		<div>
			<div>Game Results Screen</div>

			<div>
				<div>Scores:</div>
				{Object.keys(gameState.scores).map((player) => (
					<div>
						{player} - {gameState.scores?.[player] ?? 0}
					</div>
				))}
			</div>

			<GamesAnswersNextBtnWrapper>
				<QUButton onClick={home} title={'Home'} />
			</GamesAnswersNextBtnWrapper>
		</div>
	);
};
