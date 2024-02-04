import { QUAnswerLetter, QUPlayeritemContainer, QUPlayerName, QUPlayerPointIcon, QUPlayerScore } from './qu-player-item.styles';
import { Camel, Pointsicon } from '../../Images';
import { QUAvatar } from '../qu-avatar/qu-avatar';

export interface QUPlayeritemProps {
	img?;
	playerName?;
	playerPoints?;
	playerEarning?;
	showCorrect?;
	correct?;
	letter?;
}

export const QUPlayeritem: React.FC<QUPlayeritemProps> = ({ img = <img src={Camel} />, playerName = 'User name', playerPoints, playerEarning, showCorrect, correct, letter }) => {
	return (
		<QUPlayeritemContainer>
			<QUAvatar img={img} />
			<QUPlayerName>{playerName}</QUPlayerName>
			{showCorrect && <QUAnswerLetter correct={correct}>{letter}</QUAnswerLetter>}
			<QUPlayerScore>
				<QUPlayerPointIcon src={Pointsicon} />
				{playerPoints}
				{playerEarning !== 0 && ` + ${playerEarning}`}
			</QUPlayerScore>
		</QUPlayeritemContainer>
	);
};
