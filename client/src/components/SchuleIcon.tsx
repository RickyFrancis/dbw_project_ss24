import SchuleIconImage from '../static/icons/schule_2_64.png';

interface SchuleIconProps {
  size?: number;
}

const SchuleIcon = ({ size }: SchuleIconProps) => {
  return <img src={SchuleIconImage} alt="" width={size} height={size} />;
};

export default SchuleIcon;
