import { useState } from 'react';
import Icons from '../../Images';
import { SIZE } from '../../utils/Enums';
import { QUAvatarBadgenumber, QUAvatarBadgePlace, QUAvatarBadges, QUAvatarContainer } from './qu-avatar.styles';

export interface QUAvatarProps {
	size?: SIZE;
	img?;
	color?;
	Place?;
	showBadges?;
}

export const QUAvatar: React.FC<QUAvatarProps> = ({ img = <Icons.Camel />, color, Place, showBadges, size }) => {
	return (
		<QUAvatarContainer color={color} size={size}>
			{img}
			{showBadges && (
				<QUAvatarBadges size={size}>
					<QUAvatarBadgePlace size={size}>
						{Place === 1 && <Icons.Goldmedal />}
						{Place === 2 && <Icons.Silvermedal />}
						{Place === 3 && <Icons.Bronzemedal />}
					</QUAvatarBadgePlace>
					<QUAvatarBadgenumber size={size}>{Place}</QUAvatarBadgenumber>
				</QUAvatarBadges>
			)}
		</QUAvatarContainer>
	);
};
