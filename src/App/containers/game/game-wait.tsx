import { ReactElement } from 'react';
import { RootState, useAppSelector } from '../../redux/store';
import QRequest from '../../services/QRequest';

export const GameWaitScreen = ({ gameState }: { gameState: any }): ReactElement => {
	const { room, host, username } = useAppSelector((state: RootState) => state.game);

	const startGame = async () => {
		if (host) {
			const { data } = await QRequest.get('/gamerun/proceed');
			console.log('data: ', data);
		}
	};

	return (
		<div>
			{host ? 'Start game when ready' : `Waiting for game ${username}`}
			<div>
				<h4>Room: {room}</h4>

				{host && (
					<div>
						<button onClick={startGame}>Start Game</button>
					</div>
				)}
			</div>
		</div>
	);
};
