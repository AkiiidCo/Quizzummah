import { css } from 'styled-components/macro';
import { GlobalColors } from './global-styles';
import { Theme } from '@material-ui/core/styles/createTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const popoverStyles = {
	main: (theme: Theme) =>
		createStyles({
			popover: {
				pointerEvents: 'none',
				color: `${GlobalColors.white2}`,
			},
			paper: {
				backgroundColor: `${GlobalColors.neutral2}`,
				padding: theme.spacing(1),
				width: '173px',
			},
		}),
};

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
