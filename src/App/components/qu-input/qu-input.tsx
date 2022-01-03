import { QUInputContainer, QUInputField, QULabel } from './qu-input.styles';

export interface QUInputProps {
	type?;
	label?;
	onChange?;
}

export const QUInput: React.FC<QUInputProps> = ({ type, label, onChange }) => {
	return (
		<QUInputContainer>
			<QULabel>{label}</QULabel>
			<QUInputField onChange={onChange} type={type} />
		</QUInputContainer>
	);
};
