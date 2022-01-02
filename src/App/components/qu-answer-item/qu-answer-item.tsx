import { useState } from 'react';
import { QUAnswerBadge, QUAnswerItemContainer, QUAnswerLetter, QUAnswerText } from './qu-answer-item.styles';
import Icons from '../../Images';

export interface QUAnswerItemProps {
	id?;
	letter?;
	showCorrect?;
	correct?;
	onChange?;
	checked?;
}
export const QUAnswerItem: React.FC<QUAnswerItemProps> = ({ id, letter = 'A', showCorrect, correct, onChange, checked }) => {
	return (
		<QUAnswerItemContainer htmlFor={id} checked={checked} showCorrect={showCorrect} correct={correct}>
			<QUAnswerLetter showCorrect={showCorrect} correct={correct} checked={checked}>
				{letter}
			</QUAnswerLetter>
			<QUAnswerText>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste porro reprehenderit explicabo deserunt rem laboriosam repudiandae optio. Esse, possimus. Assumenda.
			</QUAnswerText>
			{showCorrect && <QUAnswerBadge>{correct ? <Icons.Rightanswer /> : <Icons.Wronganswer />}</QUAnswerBadge>}
			<input type="radio" name="answer" id={id} onChange={onChange} />
		</QUAnswerItemContainer>
	);
};
