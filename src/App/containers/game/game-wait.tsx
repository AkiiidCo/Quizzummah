import { ReactElement } from 'react';
import { RootState, useAppSelector } from '../../redux/store';
import QRequest from '../../services/QRequest';

export const GameWaitScreen = (): ReactElement => {
	const room = useAppSelector((state: RootState) => state.game.room);
	const host = useAppSelector((state: RootState) => state.game.host);

	const startGame = async () => {
		if (host) {
			const { data } = await QRequest.get('/gamerun/proceed');
			console.log('data: ', data);
		}
	};

	return (
		<div>
			{host ? 'Start game when ready' : 'Waiting for game'}
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
