import styled from 'styled-components';
import { GlobalColors, Rules, Styles } from '../../styles/global-styles';
import { row, row_center_both, row_center_vertical } from '../../styles/styles-helpers';
export const QUAnswerItemContainer = styled.label`
	${({ checked }) => (checked ? `background-color: ${GlobalColors.lightBlue};color:${GlobalColors.white};` : `background-color: ${GlobalColors.white};color:${GlobalColors.darkBlue};`)};
	${({ correct, showCorrect }) =>
		showCorrect && correct
			? `
border: 1px solid ${GlobalColors.answerGreen};
background-color: ${GlobalColors.white};
color:${GlobalColors.darkBlue};
`
			: showCorrect &&
			  !correct &&
			  `
border: 1px solid ${GlobalColors.answerRed};
background-color: ${GlobalColors.white};
color:${GlobalColors.darkBlue};
`}
	box-shadow: ${Styles.answerItemShadow};
	border-radius: ${Rules.boxItem};
	${row_center_vertical}
	padding: 16px;
	gap: 16px;
	input[type='radio'] {
		display: none;
	}
	position: relative;
`;
export const QUAnswerLetter = styled.div`
	min-width: 40px;
	min-height: 40px;
	flex: 1 1 80px;
	border-radius: ${Rules.perfectCircle};

	${({ checked }) =>
		checked
			? `
	border: 2px solid ${GlobalColors.white};
	color:${GlobalColors.white};
	`
			: `
	border: 2px solid ${GlobalColors.darkBlue};
	color:${GlobalColors.darkBlue};
	`}

	${({ correct, showCorrect }) =>
		showCorrect && correct
			? `
			border: 2px solid ${GlobalColors.answerGreen};
			color:${GlobalColors.answerGreen};
`
			: showCorrect &&
			  !correct &&
			  `
			  border: 2px solid ${GlobalColors.answerRed};
			  color:${GlobalColors.answerRed};
`}
	${row_center_both}
	font-size: 1.5rem;
	font-weight: 900;
`;
export const QUAnswerText = styled.div``;
export const QUAnswerBadge = styled.div`
	position: absolute;
	bottom: -10px;
	right: 0;
`;
