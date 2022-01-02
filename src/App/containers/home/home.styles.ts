import { before, btn_default, column, container, flex, row, row_center_between, row_center_both, row_center_vertical } from '../../styles/styles-helpers';
import styled from 'styled-components';
import { GlobalColors } from '../../styles/global-styles';
export const HomeContainer = styled.div`
	${container}
	${column}
	gap: 1rem;
`;
export const HomeHeader = styled.div`
	${row_center_between}
	${before}
	padding-top: 1rem;
`;
export const HeaderSettingsBtn = styled.button`
	${row_center_both}
	${btn_default}
`;
export const HomeHero = styled.div`
	${row_center_vertical}
	flex-wrap: wrap;
	gap: 2rem;
`;
export const HomeRightSection = styled.div`
	flex: 1 1 300px;
	${column}
	gap: 16px;
`;
export const HomeLeftSection = styled.div`
	${row_center_both}
	flex: 1 1 300px;
	img {
		width: 100%;
	}
`;
export const HomeInputs = styled.div`
	${column}
	gap: 16px;
	input {
		border: 2px solid ${GlobalColors.darkBlue60};
		padding: 16px;
		font-size: 1rem;
		border-radius: 50px;
		outline-color: ${GlobalColors.lightBlue};
	}
`;
export const HomeFooter = styled.div`
	${column}
	gap: 8px;
	max-width: 400px;
	width: 100%;
	margin: 0 auto;
`;
export const HomeSmallTitle = styled.div`
	text-align: center;
	color: ${GlobalColors.darkBlue};
`;
