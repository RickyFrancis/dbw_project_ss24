import KindertageseinrichtungIconImage from '../static/icons/kindertageseinrichtung_2_64.png';

interface KindertageseinrichtungIconProps {
  size?: number;
}

const KindertageseinrichtungIcon = ({
  size,
}: KindertageseinrichtungIconProps) => {
  return (
    <img
      src={KindertageseinrichtungIconImage}
      alt=""
      width={size}
      height={size}
    />
  );
};

export default KindertageseinrichtungIcon;
