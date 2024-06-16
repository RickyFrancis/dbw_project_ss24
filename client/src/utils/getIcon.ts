import L from 'leaflet';

export default function getIcon(
  iconName: string = 'schule',
  iconSize: [number, number] = [25, 25]
) {
  return L.icon({
    iconUrl: require('../static/icons/' + iconName + '.png'),
    iconSize,
  });
}
