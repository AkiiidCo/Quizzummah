import styled from 'styled-components';
import { GlobalColors, Rules } from '../../styles/global-styles';
import { row_center_between, row_center_both } from '../../styles/styles-helpers';
import { SIZE } from '../../utils/Enums';

export const QUAvatarContainer = styled.div<{ size?: SIZE; }>`
	${row_center_both}
	background-color: ${({ color }) => (color ? color : GlobalColors.darkBlue)};
	border-radius: ${Rules.perfectCircle};
	width: 48px;
	height: 48px;
	${({ size }) =>
		size === SIZE.MEDIUM &&
		`
	width: 64px;
	height: 64px;
	`}
	${({ size }) =>
		size === SIZE.LARGE &&
		`
	width: 112px;
	height: 112px;
	`}
	position: relative;
`;
export const QUAvatarBadges = styled.div<{ size?: SIZE; }>`
	${row_center_between}
`;
export const QUAvatarBadgePlace = styled.div<{ size?: SIZE; }>`
	position: absolute;
	left: 0;
	bottom: -12px;
	${({ size }) =>
		size === SIZE.MEDIUM &&
		`
		left: -5px;
			bottom: -16px;
			`}
	${({ size }) =>
		size === SIZE.LARGE &&
		`
		left: -7px;
			bottom: -18px;
			`}
	svg {
		${({ size }) =>
			size === SIZE.MEDIUM &&
			`
	width: 32px;
	height: 32px;
	
	`}
		${({ size }) =>
			size === SIZE.LARGE &&
			`
	width: 48px;
	height: 48px;
	`}
	}
`;
export const QUAvatarBadgenumber = styled.div<{ size?: SIZE; }>`
	${row_center_both}
	background-color: ${GlobalColors.white};
	border-radius: ${Rules.perfectCircle};
	min-width: 24px;
	min-height: 24px;
	font-weight: 900;
	position: absolute;
	right: -10px;
	bottom: -10px;
	padding: 2px;
	${({ size }) =>
		size === SIZE.LARGE &&
		`
		right: -5px;
		bottom: -5px;
	min-width: 40px;
	min-height: 40px;
	font-size: 1.5rem;
	`}
	${({ size }) =>
		size === SIZE.MEDIUM &&
		`
	min-width: 32px;
	min-height: 32px;
	font-size: 1.2rem;
	`}
`;
