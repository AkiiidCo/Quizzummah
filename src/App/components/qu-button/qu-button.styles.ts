import styled from 'styled-components';
import { GlobalColors } from '../../styles/global-styles';
import { btn_default, row_center_both } from '../../styles/styles-helpers';
export const QUButtonContainer = styled.a`
	${btn_default}
	${row_center_both}
	gap: 16px;
	text-transform: uppercase;
	font-weight: 900;
	font-size: 1rem;
	background: ${GlobalColors.darkBlue};
	color: ${GlobalColors.white};
	border-radius: 50px;
	padding: 16px;
	width: 100%;
	transition: 0.3s;
	&:hover {
		background: ${GlobalColors.darkBlue60};
	}
`;
export const QUButtonStartIcon = styled.div`
	max-width: 48px;
	img {
		width: 100%;
	}
`;
export const QUButtonText = styled.div``;
