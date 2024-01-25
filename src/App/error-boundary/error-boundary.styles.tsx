import styled from 'styled-components';
import { GlobalColors, Rules } from '../styles/global-styles';
// import Illustrations from 'src/App/Images/new-illustrations';
import { column_center_both } from '../styles/styles-helpers';

export const EBBackground = styled.div`
	width: 100vw;
	height: 100vh;
	${column_center_both}
	justify-content: flex-start;
	padding-top: 14vh;
	color: ${GlobalColors.darkBlue};
`;
// export const EBIllustrations = styled(Illustrations.SomethingWentWrong)``;
export const EBIllustrations = styled.div``;
export const EBTitle = styled.h2`
	font-size: 30px;
	color: ${GlobalColors.darkBlue};
	margin-bottom: 0;
`;
export const EBDescription = styled.h3`
	font-size: 18px;
`;
export const EBProblem = styled.span`
	margin-top: 3em;
	font-size: 16px;
	color: ${GlobalColors.darkBlue};
`;
export const EBAnchour = styled.a`
	cursor: pointer;
	padding-left: 0.5em;
	color: ${GlobalColors.darkBlue};
`;
export const EBReloadBtn = styled.button`
	outline: none;
	border: none;
	padding: 1em 2em;
	cursor: pointer;
	background: ${GlobalColors.darkBlue};
	border-radius: ${Rules.radiusButtonCTA};
	color: ${GlobalColors.white1};
	text-transform: uppercase;
	font-weight: bold;
	&:hover {
		background-color: ${GlobalColors.transBlack15};
	}
`;
