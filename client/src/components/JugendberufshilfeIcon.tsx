import JugendberufshilfeIconImage from '../static/icons/jugendberufshilfe_2_64.png';

interface JugendberufshilfeIconProps {
  size?: number;
}

const JugendberufshilfeIcon = ({ size }: JugendberufshilfeIconProps) => {
  return (
    <img src={JugendberufshilfeIconImage} alt="" width={size} height={size} />
  );
};

export default JugendberufshilfeIcon;
