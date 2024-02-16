import { ReactElement } from 'react';
import { QUAvatar } from '../../components/qu-avatar/qu-avatar';
import { RootState, useAppSelector } from '../../redux/store';
import QRequest, { proceedGame } from '../../services/QRequest';
import { GameAvatarContainer, GameAvatarItem, GameContainer, GameDescription, GameDescriptionContainer, GameDescriptionLabel, GameTopBottpmSpacer, MasjidIllustartion } from './game.styles';
import { QUButton } from '../../components/qu-button/qu-button';
import { Masjid } from '../../Images';

export const GameWaitScreen = ({ players }: { players: string[] }): ReactElement => {
	const { room, host, username } = useAppSelector((state: RootState) => state.game);

	const startGame = async () => {
		if (host) {
			try {
				await proceedGame();
			} catch (err) {}
		}
	};

	return (
		<GameContainer>
			<div className="flex items-center justify-center gap-2 p-4 flex-wrap">
				<MasjidIllustartion src={Masjid} />
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
			</div>
			<GameAvatarContainer>
				{players.map((item) => (
					<GameAvatarItem key={item}>
						<QUAvatar />
						<span>{item}</span>
					</GameAvatarItem>
				))}
			</GameAvatarContainer>
		</GameContainer>
	);
};
