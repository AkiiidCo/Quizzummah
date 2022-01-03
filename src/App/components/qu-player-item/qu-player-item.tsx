import { useState } from 'react';
import { QUAnswerLetter, QUPlayeritemContainer, QUPlayerName, QUPlayerPointIcon, QUPlayerScore } from './qu-player-item.styles';
import Icons from '../../Images';
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

export const QUPlayeritem: React.FC<QUPlayeritemProps> = ({ img = <Icons.Camel />, playerName = 'User name', playerPoints, playerEarning, showCorrect, correct, letter }) => {
	return (
		<QUPlayeritemContainer>
			<QUAvatar img={img} />
			<QUPlayerName>{playerName}</QUPlayerName>
			{showCorrect && <QUAnswerLetter correct={correct}>{letter}</QUAnswerLetter>}
			<QUPlayerScore>
				<QUPlayerPointIcon />
				{playerPoints}
				{playerEarning !== 0 && ` + ${playerEarning}`}
			</QUPlayerScore>
		</QUPlayeritemContainer>
	);
};
