import React, { useCallback } from 'react';
import { useMap } from 'react-leaflet';
import LocateControl from './LocateControl';
import { CHEMNITZ_COORDINATES } from '../constants/appConstants';

interface MapManagerProps {
  userLocation: [number, number];
  setUserLocation: React.Dispatch<React.SetStateAction<[number, number]>>;
  zoom: number;
}

const MapManager: React.FC<MapManagerProps> = ({
  userLocation,
  setUserLocation,
  zoom,
}) => {
  const map = useMap(); // This is now correctly placed within a component that is a descendant of MapContainer.
  map.setZoom(zoom);

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
        setUserLocation(CHEMNITZ_COORDINATES);
      }
    );
  }, [map, setUserLocation]);

  return <LocateControl onLocate={handleLocateUser} map={map} />;
};

export default MapManager;
