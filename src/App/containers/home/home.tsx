import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router';
import { updateGame } from '../../redux/slices/game.slice';
import { useAppDispatch } from '../../redux/store';
import QRequest from '../../services/QRequest';
import { BismiAllah, Creategame, LogoQuizzUmmah, Masjid, Play } from '../../Images';
import { QUButton } from '../../components/qu-button/qu-button';
import { HomeContainer, HomeHero, HomeRightSection, HomeInputs, HomeFooter, HomeLink } from './home.styles';

export const Home = (): ReactElement => {
	const dispatch = useAppDispatch();
	const navigation = useNavigate();
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState(localStorage.getItem('username') || '');
	const [avatar] = useState('default');
	const [room, setRoom] = useState('');

	const createGame = async () => {
		setLoading(true);
		const settings = {
			displayOnly: false,
			username,
			avatar,
		};
		const { data } = await QRequest.post('/game/create', settings);

		dispatch(updateGame({ ...data }));
		sessionStorage.setItem('gameToken', data.gameToken);
		sessionStorage.setItem('room', data.room);
		localStorage.setItem('username', data.username);

		setLoading(false);
		navigation('game', { state: { page: data.page, players: data.players } });
	};

	const openJoinGame = async () => {
		setLoading(true);
		const { data } = await QRequest.post('/game/join', { room, username, avatar });

		dispatch(updateGame(data));
		sessionStorage.setItem('gameToken', data.gameToken);
		localStorage.setItem('username', data.username);

		setLoading(false);
		navigation('game', { state: { page: data.page, players: data.players } });
	};

	return (
		<HomeContainer>
			<div className="flex justify-center flex-row pt-4 items-center">
				<img src={BismiAllah} />
				{/* <HeaderSettingsBtn>
					<img src={Settings} />
					Settings
				</HeaderSettingsBtn> */}
			</div>
			<HomeHero>
				<div className="flex-shrink  flex-[300px] w-300 flex-row items-center hidden md:flex">
					<img src={Masjid} className="w-full" />
				</div>
				<HomeRightSection>
					<img src={LogoQuizzUmmah} className=" w-3/5 mb-12 md:w-full" />

					<div className="items-center text-darkBlue">Enter name</div>
					<HomeInputs>
						<input autoFocus disabled={loading} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Name" />
					</HomeInputs>
					<HomeInputs>
						<input disabled={loading} value={room} onChange={(e) => setRoom(e.target.value)} maxLength={4} placeholder="Room Code" />
					</HomeInputs>
					<QUButton disabled={loading || !username || !room} title="Join game" onClick={openJoinGame} small LeftIcon={<img src={Play} />} />
					<div className="items-center text-darkBlue">or create a game</div>
					<QUButton disabled={loading || !username} title="Create game" onClick={createGame} small outlined LeftIcon={<img src={Creategame} />} />
				</HomeRightSection>
			</HomeHero>
			{/* <HomeFooter>
				<div className="items-center text-darkBlue mt-4 text-center">
					Contribute to QuizzUmmah by
					<HomeLink href="https://forms.gle/Q293AdE1eBJez7U28" target="_blank">
						{' '}
						Submiting a question
					</HomeLink>
				</div>
			</HomeFooter> */}
		</HomeContainer>
	);
};
