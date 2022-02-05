import { ReactElement } from 'react';
import { QUAvatar } from '../../components/qu-avatar/qu-avatar';
import { RootState, useAppSelector } from '../../redux/store';
import QRequest from '../../services/QRequest';
import { GameAvatarContainer, GameAvatarItem, GameContainer, GameDescription, GameDescriptionContainer, GameDescriptionLabel, GameHeaderContainer, MasjidIllustartion } from './game.styles';
import { QUButton } from '../../components/qu-button/qu-button';

export const GameWaitScreen = ({ gameState }: { gameState: any }): ReactElement => {
	const { room, host, username } = useAppSelector((state: RootState) => state.game);

	const startGame = async () => {
		if (host) {
			const { data } = await QRequest.get('/gamerun/proceed');
			console.log('data: ', data);
		}
	};

	const users = ['user1', 'user1', 'user1', 'user1', 'user1', 'user1', 'user1', 'user1', 'user1', 'user1'];

	return (
		<GameContainer>
			<GameHeaderContainer>
				<MasjidIllustartion />
				<GameDescriptionContainer>
					<GameDescriptionLabel>Go to</GameDescriptionLabel>
					<GameDescription>quizzummah.com</GameDescription>
					<GameDescriptionLabel>Enter join code</GameDescriptionLabel>
					<GameDescription>{room}</GameDescription>
					<GameDescriptionLabel>{host ? 'Start game when ready' : `Waiting for game ${username}...`}</GameDescriptionLabel>
					{host && <QUButton onClick={startGame} title="Start Game" />}
				</GameDescriptionContainer>
			</GameHeaderContainer>
			<GameAvatarContainer>
				{users.map((item) => (
					<GameAvatarItem>
						<QUAvatar key={item} />
						<span>{item}</span>
					</GameAvatarItem>
				))}
			</GameAvatarContainer>
		</GameContainer>
	);
};
