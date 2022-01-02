import { QUButtonContainer, QUButtonStartIcon, QUButtonText } from './qu-button.styles';

export interface QUButtonProps {
	title?;
	onClick?;
	href?;
	target?;
	small?;
	outlined?;
	LeftIcon?;
}
export const QUButton: React.FC<QUButtonProps> = ({ title, onClick, href, target, small, outlined, LeftIcon }) => {
	return (
		<QUButtonContainer onClick={onClick} href={href} target={target} small={small} outlined={outlined}>
			<QUButtonStartIcon>{LeftIcon}</QUButtonStartIcon>
			<QUButtonText>{title}</QUButtonText>
		</QUButtonContainer>
	);
};
