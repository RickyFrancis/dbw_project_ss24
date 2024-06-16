import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Schulsozialarbeit } from '../types';
import getIcon from '../utils/getIcon';

interface SchulsozialarbeitMarkerProps {
  schulsozialarbeit: Schulsozialarbeit;
}

const SchulsozialarbeitMapMarker = ({
  schulsozialarbeit,
}: SchulsozialarbeitMarkerProps) => {
  return (
    <Marker
      position={[schulsozialarbeit.y, schulsozialarbeit.x]}
      icon={getIcon('schulsozialarbeit_2_64', [30, 30])}
    >
      <Popup>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              {schulsozialarbeit.BEZEICHNUNG}
            </Typography>
            <Typography variant="body2" component="p">
              {schulsozialarbeit.STRASSE}
            </Typography>
          </CardContent>
        </Card>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};

export default SchulsozialarbeitMapMarker;
