import styled from 'styled-components';
import { GlobalColors, Rules, Styles } from '../../styles/global-styles';
import { row, row_center_both, row_center_vertical } from '../../styles/styles-helpers';
import Icons from '../../Images';

export const QUPlayeritemContainer = styled.div`
	${row_center_vertical}
	box-shadow: ${Styles.answerItemShadow};
	border-radius: ${Rules.boxItem};
	background-color: ${GlobalColors.white};
	color: ${GlobalColors.darkBlue};
	width: 100%;
	padding: 8px;
	gap: 16px;
`;
export const QUPlayerName = styled.div`
	flex: 1;
	font-weight: 900;
`;
export const QUAnswerLetter = styled.div`
	min-width: 40px;
	min-height: 40px;
	border-radius: ${Rules.perfectCircle};

	${({ correct }) =>
		correct
			? `
			border: 2px solid ${GlobalColors.answerGreen};
			color:${GlobalColors.answerGreen};
`
			: `
			  border: 2px solid ${GlobalColors.answerRed};
			  color:${GlobalColors.answerRed};
`}
	${row_center_both}
	font-size: 1.5rem;
	font-weight: 900;
`;
export const QUPlayerScore = styled.div`
	${row_center_vertical}
	gap: 8px;
	font-weight: 900;
`;
export const QUPlayerPointIcon = styled(Icons.Pointsicon)`
	height: 32px;
	width: 32px;
`;
