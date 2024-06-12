// src/pages/DashboardPage.tsx
import React, { useState } from 'react';
import { useGetSchuleQuery } from '../features/schule/schuleApi';
import { Schule } from '../types';
import {
  Box,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectSchule } from '../features/schule/schuleSlice';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

function getIcon(
  iconName: string = 'schule',
  iconSize: [number, number] = [25, 25]
) {
  return L.icon({
    iconUrl: require('../static/icons/' + iconName + '.png'),
    iconSize,
  });
}

const DashboardPage = () => {
  const [bezeichnung, setBezeichnung] = useState('');
  const [strasse, setStrasse] = useState('');
  const {
    data: schuleData,
    error,
    isLoading,
  } = useGetSchuleQuery({ BEZEICHNUNG: bezeichnung, STRASSE: strasse });

  const schuleDetails: Schule[] | null = useSelector(selectSchule);

  console.log(schuleDetails);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching schedule data.</div>;
  }

  return (
    <Container>
      <Typography component="h1" variant="h3">
        Schule
      </Typography>

      <TextField
        label="Straße"
        value={strasse}
        onChange={(e) => setStrasse(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Bezeichnung"
        value={bezeichnung}
        onChange={(e) => setBezeichnung(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Box style={{ height: '600px', width: '100%' }}>
        <MapContainer
          center={[50.8264448, 12.9335296]}
          zoom={13}
          style={{ height: '600px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[50.79227491024383, 12.887276265842216]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {schuleDetails &&
            schuleDetails.map((schule, index) => {
              console.log(schule.x);
              return (
                <Marker
                  key={index}
                  position={[schule.y, schule.x]}
                  icon={getIcon('schule', [30, 30])}
                >
                  <Popup>
                    <Card>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {schule.BEZEICHNUNG}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {schule.STRASSE}
                        </Typography>
                      </CardContent>
                    </Card>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </Box>
    </Container>
  );
};

export default DashboardPage;
