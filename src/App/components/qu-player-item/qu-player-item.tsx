import { QUAnswerLetter, QUPlayeritemContainer, QUPlayerName, QUPlayerPointIcon, QUPlayerScore } from './qu-player-item.styles';
import { Camel, Pointsicon } from '../../Images';
import { QUAvatar } from '../qu-avatar/qu-avatar';
import { getAnswerFromIndex } from '../qu-answer-item/qu-answer-item';

export interface QUPlayeritemProps {
	img?;
	playerName?;
	playerPoints?;
	playerEarning?;
	showCorrect?;
	correct?;
	AnswerIndex?;
	showBadges?;
	Place?;
}

export const QUPlayeritem: React.FC<QUPlayeritemProps> = ({
	img = <img src={Camel} />,
	playerName = 'User name',
	playerPoints,
	playerEarning,
	showCorrect,
	correct,
	AnswerIndex,
	showBadges,
	Place,
}) => {
	return (
		<QUPlayeritemContainer>
			<QUAvatar img={img} showBadges={showBadges} Place={Place} />
			<QUPlayerName>{playerName}</QUPlayerName>
			{AnswerIndex >= 0 && showCorrect && <QUAnswerLetter correct={correct}>{getAnswerFromIndex(AnswerIndex)}</QUAnswerLetter>}
			<QUPlayerScore>
				<QUPlayerPointIcon src={Pointsicon} />
				{playerPoints}
				{playerEarning && ` + ${playerEarning}`}
				{` Points`}
			</QUPlayerScore>
		</QUPlayeritemContainer>
	);
};
