import { useState } from 'react';
import { QUAnswerBadge, QUAnswerItemContainer, QUAnswerLetter, QUAnswerText } from './qu-answer-item.styles';
import Icons from '../../Images';

export interface QUAnswerItemProps {
	AnswerIndex?;
	showCorrect?;
	correct?;
	content?;
	onClick?;
	checked?;
}
export const QUAnswerItem: React.FC<QUAnswerItemProps> = ({ AnswerIndex = 0, showCorrect, correct, content, onClick, checked }) => {
	let letter = 'A';
	switch (AnswerIndex) {
		case 0:
			letter = 'A';
			break;
		case 1:
			letter = 'B';
			break;
		case 2:
			letter = 'C';
			break;
		case 3:
			letter = 'D';
			break;
		default:
			letter = 'A';
			break;
	}

	return (
		<QUAnswerItemContainer onClick={onClick} checked={checked} showCorrect={showCorrect} correct={correct}>
			<QUAnswerLetter showCorrect={showCorrect} correct={correct} checked={checked}>
				{letter}
			</QUAnswerLetter>
			<QUAnswerText>{content}</QUAnswerText>
			{showCorrect && <QUAnswerBadge>{correct ? <Icons.Rightanswer /> : <Icons.Wronganswer />}</QUAnswerBadge>}
		</QUAnswerItemContainer>
	);
};
