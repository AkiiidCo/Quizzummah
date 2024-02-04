import { ReactElement, useEffect } from 'react';
import { GamesAnswersNextBtnWrapper } from './game.styles';
import { QUButton } from '../../components/qu-button/qu-button';
import { useNavigate } from 'react-router';

export const GameResultsScreen = ({ gameState }: { gameState: any }): ReactElement => {
	const navigation = useNavigate();

	useEffect(() => {
		sessionStorage.removeItem('gameToken');
	}, []);

	const home = () => {
		navigation('/');
	};

	return (
		<div>
			<div>Game Results Screen</div>
			<GamesAnswersNextBtnWrapper>
				<QUButton onClick={home} title={'Home'} />
			</GamesAnswersNextBtnWrapper>
		</div>
	);
};
