import styled from 'styled-components';
import { GlobalColors } from '../../styles/global-styles';
import { btn_default, row_center_both } from '../../styles/styles-helpers';

export const QUButtonContainer = styled.a<{ small?: boolean; outlined?: boolean }>`
	${btn_default}
	${row_center_both}
	${({ small }) => small && `max-width: 250px;`}
	user-select: none;
	gap: 16px;
	text-transform: uppercase;
	font-weight: 900;
	font-size: 1rem;
	border: 2px solid transparent;
	${({ outlined }) =>
		outlined
			? `
			border: 2px solid ${GlobalColors.darkBlue};
			color: ${GlobalColors.darkBlue} !important;
	`
			: `
	background: ${GlobalColors.darkBlue};
	color: ${GlobalColors.white} !important;
	`}
	border-radius: 50px;
	padding: 16px;
	width: 100%;
	transition: 0.3s;
	&:hover {
		background: ${GlobalColors.darkBlue90};
		color: ${GlobalColors.white} !important;
		border: 2px solid ${GlobalColors.darkBlue90};
	}
`;
export const QUButtonStartIcon = styled.div`
	max-width: 48px;
	img {
		width: 100%;
	}
`;
export const QUButtonText = styled.div``;
