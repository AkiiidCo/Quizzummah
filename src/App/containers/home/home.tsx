import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router';
import { updateGame } from '../../redux/slices/game.slice';
import { useAppDispatch } from '../../redux/store';
import QRequest from '../../services/QRequest';
import Icons from '../../Images';
import { QUButton } from '../../components/qu-button/qu-button';
import {
	HomeContainer,
	HomeHeader,
	HomeHero,
	HomeRightSection,
	HomeLeftSection,
	HomeInputs,
	HomeFooter,
	HomeSmallTitle,
	HeaderSettingsBtn,
	HomeLink,
	HomeQuizzummahLogo,
	HomeFooterText,
} from './home.styles';

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
		<HomeContainer>
			<HomeHeader>
				<Icons.BismiAllah />
				<HeaderSettingsBtn>
					<Icons.Settings />
					Settings
				</HeaderSettingsBtn>
			</HomeHeader>
			<HomeHero>
				<HomeLeftSection>
					<Icons.Masjid />
				</HomeLeftSection>
				<HomeRightSection>
					<HomeQuizzummahLogo />
					<QUButton title="Create game" onClick={createGame} small outlined LeftIcon={<Icons.Creategame />} />
					<HomeSmallTitle>Or join via</HomeSmallTitle>
					<HomeInputs>
						<input value={room} onChange={(e) => setRoom(e.target.value)} maxLength={4} placeholder="room" />
						<input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
					</HomeInputs>
					<QUButton title="Join game" onClick={openJoinGame} small LeftIcon={<Icons.Play />} />
				</HomeRightSection>
			</HomeHero>
			<HomeFooter>
				<HomeFooterText>
					Contribute to quizzummah by
					<HomeLink href="https://forms.gle/Q293AdE1eBJez7U28" target="_blank">
						{' '}
						Submiting a question
					</HomeLink>
				</HomeFooterText>
			</HomeFooter>
		</HomeContainer>
	);
};
