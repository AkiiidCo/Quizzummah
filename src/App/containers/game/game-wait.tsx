import { ReactElement } from 'react';
import { QUAvatar } from '../../components/qu-avatar/qu-avatar';
import { RootState, useAppSelector } from '../../redux/store';
import QRequest from '../../services/QRequest';
import {
	GameAvatarContainer,
	GameAvatarItem,
	GameContainer,
	GameDescription,
	GameDescriptionContainer,
	GameDescriptionLabel,
	GameHeaderContainer,
	GameTopBottpmSpacer,
	MasjidIllustartion,
} from './game.styles';
import { QUButton } from '../../components/qu-button/qu-button';

export const GameWaitScreen = ({ players }: { players: string[] }): ReactElement => {
	const { room, host, username } = useAppSelector((state: RootState) => state.game);

	const startGame = async () => {
		if (host) {
			await QRequest.get('/gamerun/proceed');
		}
	};

	return (
		<GameContainer>
			<GameHeaderContainer>
				<MasjidIllustartion />
				<GameDescriptionContainer>
					<GameDescriptionLabel>Go to</GameDescriptionLabel>
					<GameDescription>quizzummah.com</GameDescription>
					<GameDescriptionLabel>Enter join code</GameDescriptionLabel>
					<GameDescription>{room}</GameDescription>
					{host ? <GameDescriptionLabel>Start game when ready</GameDescriptionLabel> : <GameDescriptionLabel>joined as</GameDescriptionLabel>}
					{!host && <GameDescription>{username}</GameDescription>}

					{host && (
						<GameTopBottpmSpacer>
							<QUButton onClick={startGame} title="Start Game" />
						</GameTopBottpmSpacer>
					)}
				</GameDescriptionContainer>
			</GameHeaderContainer>
			<GameAvatarContainer>
				{players.map((item) => (
					<GameAvatarItem>
						<QUAvatar key={item} />
						<span>{item}</span>
					</GameAvatarItem>
				))}
			</GameAvatarContainer>
		</GameContainer>
	);
};
