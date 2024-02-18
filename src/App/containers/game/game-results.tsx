import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Swipeleft, Trophy } from '../../Images';
import { QUButton } from '../../components/qu-button/qu-button';
import { QUPlayeritem } from '../../components/qu-player-item/qu-player-item';
import WSManager from '../../managers/ws.manager';
import { GameContainer } from './game.styles';

export const GameResultsScreen = ({ gameState }: { gameState: any }): ReactElement => {
	const navigation = useNavigate();
	const [showResults, setShowResults] = useState(false);

	useEffect(() => {
		sessionStorage.removeItem('gameToken');
		WSManager.disconnect();
		WSManager.removeAllListeners();
		const audio = new Audio('/assets/audio/epic-hybrid.mp3');
		audio.volume = 0.1;
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
		<GameContainer>
			<div className="flex flex-col items-center gap-8">
				<img src={Trophy} />
				<div className="text-3xl text-center">Game Results Screen</div>

				<div className="flex flex-col gap-2 w-full max-w-[500px]">
					{showResults &&
						gameState.scores.map((player: { username: string; score: number }, index) => (
							<div>
								<QUPlayeritem playerName={player.username} playerPoints={player.score ?? 0} showBadges Place={index + 1} />
							</div>
						))}
				</div>

				<div className="ml-auto mr-auto min-w-[150px]">
					<QUButton LeftIcon={<img src={Swipeleft} />} onClick={home} title={'Home'} />
				</div>
			</div>
		</GameContainer>
	);
};
