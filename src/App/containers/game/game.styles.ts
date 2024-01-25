import styled from 'styled-components';
import { column, column_center_both, container, row, row_center_both } from '../../styles/styles-helpers';
import Icons from '../../Images';
export const GameContainer = styled.div`
	${container}
	height: 100vh;
	padding: 1rem;
`;
export const GameHeaderContainer = styled.div`
	${row_center_both}
	gap: 2rem;
	margin: 3rem 0;
`;
export const MasjidIllustartion = styled(Icons.Masjid)`
	max-width: 200px;
	max-height: 200px;
`;
export const GameDescriptionContainer = styled.div``;
export const GameDescriptionLabel = styled.div`
	font-size: 1rem;
`;
export const GameDescription = styled.div`
	font-size: 2rem;
	font-weight: bold;
`;
export const GameTopBottpmSpacer = styled.div`
	margin: 0.5rem 0;
`;
export const GameAvatarContainer = styled.div`
	${row}
	gap: 1rem;
	flex-wrap: wrap;
`;
export const GameAvatarItem = styled.div`
	${column_center_both}
	gap: .2rem;
`;
export const GameQuestion = styled.div<{ host?: boolean }>`
	font-size: ${({ host }) => (host ? `3rem` : `2rem`)};
`;
export const GameAnswersWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
`;
export const GameQuestionWrapper = styled.div`
	${column}
	height: 100%;
	justify-content: space-between;
`;
export const GamesAnswersNextBtnWrapper = styled.div`
	max-width: 250px;
	justify-self: flex-end;
`;
