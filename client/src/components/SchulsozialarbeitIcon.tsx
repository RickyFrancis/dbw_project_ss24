import SchulsozialarbeitIconImage from '../static/icons/schulsozialarbeit_2_64.png';

interface SchulsozialarbeitIconProps {
  size?: number;
}

const SchulsozialarbeitIcon = ({ size }: SchulsozialarbeitIconProps) => {
  return (
    <img src={SchulsozialarbeitIconImage} alt="" width={size} height={size} />
  );
};

export default SchulsozialarbeitIcon;
