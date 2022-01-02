import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router';
import { updateGame } from '../../redux/slices/game.slice';
import { useAppDispatch } from '../../redux/store';
import QRequest from '../../services/QRequest';
import Icons from '../../Images';

export const Home = (): ReactElement => {
	const dispatch = useAppDispatch();
	const navigation = useNavigate();
	const [username, setUsername] = useState('');
	const [avatar, setAvatar] = useState('default');
	const [room, setRoom] = useState('');

	const createGame = async () => {
		console.log('createGame');
		const settings = {};
		const { data } = await QRequest.post('/game/create', settings);
		console.log('Create Game res: ', data);

		dispatch(updateGame({ ...data }));
		sessionStorage.setItem('gameToken', data.gameToken);

		navigation('game');
	};

	const openJoinGame = async () => {
		console.log('openJoinGame');
		const { data } = await QRequest.post('/game/join', { room, username, avatar });

		dispatch(updateGame(data));
		sessionStorage.setItem('gameToken', data.gameToken);

		navigation('game');
	};

	return (
		<div>
			Home
			<div>
				<div>
					<button onClick={createGame}>Create game</button>
					<div>
						or
						<div>
							<input value={room} onChange={(e) => setRoom(e.target.value)} maxLength={4} placeholder="room" />
							<input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
						</div>
						<button onClick={openJoinGame}>Join game</button>
					</div>
				</div>
			</div>
			<Icons.Masjid />
		</div>
	);
};
