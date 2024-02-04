import { QUButtonContainer, QUButtonStartIcon, QUButtonText } from './qu-button.styles';

export interface QUButtonProps {
	title?;
	onClick?;
	href?;
	target?;
	small?;
	outlined?;
	LeftIcon?;
	disabled?;
}
export const QUButton: React.FC<QUButtonProps> = ({ title, onClick, href, target, small, outlined, LeftIcon, disabled }) => {
	return (
		<QUButtonContainer onClick={onClick} href={href} target={target} small={small} outlined={outlined} disabled={disabled}>
			<QUButtonStartIcon>{LeftIcon}</QUButtonStartIcon>
			<QUButtonText>{title}</QUButtonText>
		</QUButtonContainer>
	);
};
