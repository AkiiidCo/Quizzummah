import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router';
import { updateGame } from '../../redux/slices/game.slice';
import { useAppDispatch } from '../../redux/store';
import QRequest from '../../services/QRequest';
import { BismiAllah, Creategame, LogoQuizzUmmah, Masjid, Play } from '../../Images';
import { QUButton } from '../../components/qu-button/qu-button';
import { HomeContainer, HomeHero, HomeRightSection, HomeInputs, HomeFooter, HomeLink } from './home.styles';
import { toast } from 'react-toastify';
import ReactGA from 'react-ga4';

export const Home = (): ReactElement => {
	const dispatch = useAppDispatch();
	const navigation = useNavigate();
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState(localStorage.getItem('username') || '');
	const [avatar] = useState('default');
	const [room, setRoom] = useState('');
	const [advancedMode, setAdvancedMode] = useState(false);
	const [intermissionTime, setIntermissionTime] = useState(parseInt(localStorage.getItem('intermissionTime')) || 10);
	const [questionTime, setQuestionTime] = useState(parseInt(localStorage.getItem('questionTime')) || 20);
	const [questionAmount, setQuestionAmount] = useState(parseInt(localStorage.getItem('questionAmount')) || 10);

	const createGame = async () => {
		try {
			setLoading(true);
			const settings = {
				displayOnly: false,
				username,
				avatar,
				intermissionTime: intermissionTime * 1000, // miliseconds to seconds
				questionTime: questionTime * 1000, // miliseconds to seconds
				questionAmount,
			};

			const { data } = await QRequest.post('/game/create', settings);

			ReactGA.event({
				category: 'game',
				action: 'create',
				label: data.room,
			});

			dispatch(updateGame({ ...data }));
			sessionStorage.setItem('gameToken', data.gameToken);
			sessionStorage.setItem('room', data.room);
			localStorage.setItem('username', data.username);
			localStorage.setItem('intermissionTime', intermissionTime.toString());
			localStorage.setItem('questionTime', questionTime.toString());
			localStorage.setItem('questionAmount', questionAmount.toString());

			setLoading(false);
			navigation('game', { state: { page: data.page, players: data.players } });
		} catch (err) {
			setLoading(false);
			console.error('Could not create game, please try again: ', err);
			toast.error('Could not create game. Error: ' + err.message);
		}
	};

	const openJoinGame = async () => {
		try {
			setLoading(true);
			const { data } = await QRequest.post('/game/join', { room, username, avatar });

			ReactGA.event({
				category: 'game',
				action: 'join',
				label: room,
			});

			dispatch(updateGame(data));
			sessionStorage.setItem('gameToken', data.gameToken);
			localStorage.setItem('username', data.username);

			setLoading(false);
			navigation('game', { state: { page: data.page, players: data.players } });
		} catch (err) {
			setLoading(false);
			console.error('Could not join game, please try again: ', err);
			toast.error('Could not join game. ' + err.message);
		}
	};

	return (
		<HomeContainer>
			{advancedMode ? (
				<div className="flex flex-col items-center gap-2 max-w-[400px] m-auto">
					<img src={LogoQuizzUmmah} className=" p-2 mb-12 mt-8" />
					<div className="flex flex-col w-full">
						<label className="mt-4">Enter your name</label>
						<input autoFocus disabled={loading} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Name" />
						<label className="mt-4">Intermission time (in seconds)</label>
						<input disabled={loading} type="number" value={intermissionTime} onChange={(e) => setIntermissionTime(parseInt(e.target.value) || 10)} placeholder="intermission Time" />
						<label className="mt-4">Time per question (in seconds)</label>
						<input disabled={loading} type="number" value={questionTime} onChange={(e) => setQuestionTime(parseInt(e.target.value) || 20)} placeholder="question Time" />
						<label className="mt-4">Questions amount per game</label>
						<input disabled={loading} type="number" value={questionAmount} onChange={(e) => setQuestionAmount(parseInt(e.target.value) || 10)} placeholder="question Amount" />
					</div>
					<QUButton disabled={loading || !username} title="Create game" onClick={createGame} LeftIcon={<img src={Creategame} />} />
					<div
						className="items-center cursor-pointer text-darkBlue90 font-bold underline"
						onClick={() => {
							setAdvancedMode(false);
						}}
					>
						Back to basic mode
					</div>
				</div>
			) : (
				<>
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
							<div
								className="items-center cursor-pointer text-darkBlue90 font-bold underline"
								onClick={() => {
									setAdvancedMode(true);
								}}
							>
								Advanced Mode
							</div>
						</HomeRightSection>
					</HomeHero>
				</>
			)}
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
