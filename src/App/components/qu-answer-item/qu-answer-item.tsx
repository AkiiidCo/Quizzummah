import { QUAnswerBadge, QUAnswerItemContainer, QUAnswerLetter, QUAnswerText } from './qu-answer-item.styles';
import { Rightanswer, Wronganswer } from '../../Images';

export interface QUAnswerItemProps {
	AnswerIndex?;
	showCorrect?;
	correct?;
	content?;
	onClick?;
	checked?;
	disabled?;
}

export const getAnswerFromIndex = (index: number) => {
	let letter = 'A';
	switch (index) {
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
	return letter;
};

export const QUAnswerItem: React.FC<QUAnswerItemProps> = ({ AnswerIndex = 0, showCorrect, correct, content, onClick, checked, disabled }) => {
	return (
		<QUAnswerItemContainer onClick={onClick} checked={checked} showCorrect={showCorrect} correct={correct} disabled={disabled}>
			<QUAnswerLetter showCorrect={showCorrect} correct={correct} checked={checked}>
				{getAnswerFromIndex(AnswerIndex)}
			</QUAnswerLetter>
			<QUAnswerText>{content}</QUAnswerText>
			{showCorrect && <QUAnswerBadge>{correct ? <img src={Rightanswer} /> : <img src={Wronganswer} />}</QUAnswerBadge>}
		</QUAnswerItemContainer>
	);
};
