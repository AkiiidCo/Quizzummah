import styled from 'styled-components/macro';
import { GlobalColors, Rules } from '../styles/global-styles';
// import Illustrations from 'src/App/Images/new-illustrations';
import { column_center_both } from '../styles/styles-helpers';

export const EBBackground = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: ${GlobalColors.neutral1};
	${column_center_both}
	justify-content: flex-start;
	padding-top: 14vh;
`;
// export const EBIllustrations = styled(Illustrations.SomethingWentWrong)``;
export const EBIllustrations = styled.div``;
export const EBTitle = styled.h2`
	font-size: 30px;
	color: ${GlobalColors.white1};
	margin-bottom: 0;
`;
export const EBDescription = styled.h3`
	font-size: 18px;
	color: ${GlobalColors.white2};
`;
export const EBProblem = styled.span`
	margin-top: 3em;
	font-size: 16px;
	color: ${GlobalColors.white2};
`;
export const EBAnchour = styled.a`
	cursor: pointer;
	padding-left: 0.5em;
	color: ${GlobalColors.primary1};
`;
export const EBReloadBtn = styled.button`
	outline: none;
	border: none;
	padding: 1em 2em;
	cursor: pointer;
	background: ${GlobalColors.transWhite};
	border-radius: ${Rules.radiusButtonCTA};
	color: ${GlobalColors.white1};
	text-transform: uppercase;
	font-weight: bold;
	&:hover {
		background-color: ${GlobalColors.transBlack15};
	}
`;
