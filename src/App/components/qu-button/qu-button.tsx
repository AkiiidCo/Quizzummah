import { QUButtonContainer, QUButtonStartIcon, QUButtonText } from './qu-button.styles';

export const QUButton = ({ title, onClick, href = '#', target = null }) => {
	return (
		<QUButtonContainer onClick={onClick} href={href} target={target}>
			<QUButtonStartIcon></QUButtonStartIcon>
			<QUButtonText>{title}</QUButtonText>
		</QUButtonContainer>
	);
};
