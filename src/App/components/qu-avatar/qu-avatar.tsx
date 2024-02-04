import { Bronzemedal, Camel, Goldmedal, Silvermedal } from '../../Images';
import { SIZE } from '../../utils/Enums';
import { QUAvatarBadgenumber, QUAvatarBadgePlace, QUAvatarBadges, QUAvatarContainer } from './qu-avatar.styles';

export interface QUAvatarProps {
	size?: SIZE;
	img?;
	color?;
	Place?;
	showBadges?;
}

export const QUAvatar: React.FC<QUAvatarProps> = ({ img = <img src={Camel} />, color, Place, showBadges, size }) => {
	return (
		<QUAvatarContainer color={color} size={size}>
			{img}
			{showBadges && (
				<QUAvatarBadges size={size}>
					<QUAvatarBadgePlace size={size}>
						{Place === 1 && <img src={Goldmedal} />}
						{Place === 2 && <img src={Silvermedal} />}
						{Place === 3 && <img src={Bronzemedal} />}
					</QUAvatarBadgePlace>
					<QUAvatarBadgenumber size={size}>{Place}</QUAvatarBadgenumber>
				</QUAvatarBadges>
			)}
		</QUAvatarContainer>
	);
};
