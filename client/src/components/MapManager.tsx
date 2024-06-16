import React, { useCallback } from 'react';
import { useMap } from 'react-leaflet';
import LocateControl from './LocateControl';

interface MapManagerProps {
  userLocation: [number, number];
  setUserLocation: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const MapManager: React.FC<MapManagerProps> = ({
  userLocation,
  setUserLocation,
}) => {
  const map = useMap(); // This is now correctly placed within a component that is a descendant of MapContainer.

  const handleLocateUser = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newUserLocation: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setUserLocation(newUserLocation);
        map.setView(newUserLocation, map.getZoom());
      },
      () => {
        console.error('Error relocating');
        setUserLocation([50.8264448, 12.9335296]);
      }
    );
  }, [map, setUserLocation]);

  return <LocateControl onLocate={handleLocateUser} map={map} />;
};

export default MapManager;
