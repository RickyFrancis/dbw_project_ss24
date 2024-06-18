import AddressIconImage from '../static/icons/home_address.png';

interface AddressIconProps {
  size?: number;
}

const AddressIcon = ({ size }: AddressIconProps) => {
  return <img src={AddressIconImage} alt="" width={size} height={size} />;
};

export default AddressIcon;
