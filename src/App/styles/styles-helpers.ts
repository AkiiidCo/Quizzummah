import { css } from 'styled-components';
import { GlobalColors } from './global-styles';

export const flex: any = css`
	display: flex;
`;

export const row: any = css`
	display: flex;
	flex-direction: row;
`;

export const column: any = css`
	display: flex;
	flex-direction: column;
`;

export const column_start: any = css`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;

export const center: any = css`
	align-items: center;
	justify-content: center;
`;

export const row_between: any = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const row_center_horizontal: any = css`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

export const row_center_vertical: any = css`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const row_center_both: any = css`
	display: flex;
	flex-direction: row;
	${center}
`;

export const row_center_start: any = css`
	${row_center_vertical}
	justify-content: flex-start;
`;

export const row_center_vertical_start: any = css`
	${row_center_vertical}
	align-items: flex-start;
`;

export const row_center_horizontal_start: any = css`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`;

export const row_center_end: any = css`
	${row_center_vertical}
	justify-content: flex-end;
`;

export const row_center_between: any = css`
	${row_center_vertical}
	justify-content: space-between;
`;

export const row_center_around: any = css`
	${row_center_vertical}
	justify-content: space-around;
`;

export const column_center_both: any = css`
	${column}
	${center}
`;

export const column_between: any = css`
	${column}
	justify-content: space-between;
`;

export const column_center_vertical: any = css`
	${column}
	justify-content: center;
`;

export const column_center_horizontal: any = css`
	${column}
	align-items: center;
`;

export const column_center_start: any = css`
	${column_center_horizontal}
	justify-content: flex-start;
`;

export const link: any = css`
	cursor: pointer;
	text-decoration: underline !important;
`;

export const ellipse: any = css`
	display: flex;
	align-items: center;
`;
export const container: any = css`
	max-width: 900px;
	width: 100%;
	margin: 0 auto;
`;
export const before: any = css`
	&::before {
		content: '';
		display: block;
	}
`;
export const bfter: any = css`
	&::after {
		content: '';
		display: block;
	}
`;
export const btn_default: any = css`
	cursor: pointer;
	border: none;
	box-shadow: none;
	background-color: transparent;
	user-select: none;
`;
export const input_default: any = css`
	border: 2px solid ${GlobalColors.darkBlue90};
	padding: 16px;
	font-size: 1rem;
	border-radius: 50px;
	outline-color: ${GlobalColors.lightBlue};
`;
