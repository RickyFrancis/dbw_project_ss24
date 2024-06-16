// src/pages/DashboardPage.tsx
import { Box, Button, Container, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetSchuleQuery } from '../features/schule/schuleApi';
import { Schule, Schulsozialarbeit } from '../types';

import { selectSchule } from '../features/schule/schuleSlice';
import { selectSchulsozialarbeit } from '../features/schulsozialarbeit/schulsozialarbeitSlice';

import { MapContainer, TileLayer } from 'react-leaflet';
import MapManager from '../components/MapManager';
import SchuleIcon from '../components/SchuleIcon';
import SchuleMapMarker from '../components/SchuleMapMarker';
import SchulsozialarbeitIcon from '../components/SchulsozialarbeitIcon';
import SchulsozialarbeitMapMarker from '../components/SchulsozialarbeitMapMarker';
import { CHEMNITZ_COORDINATES } from '../constants/appConstants';
import { useGetSchulsozialarbeitQuery } from '../features/schulsozialarbeit/schulsozialarbeitApi';

const DashboardPage = () => {
  const [bezeichnung, setBezeichnung] = useState('');
  const [strasse, setStrasse] = useState('');
  const [userLocation, setUserLocation] =
    useState<[number, number]>(CHEMNITZ_COORDINATES);
  const [displaySchule, setDisplaySchule] = useState(true);
  const [displaySchulsozialarbeit, setDisplaySchulsozialarbeit] =
    useState(true);

  const {
    data: schuleData,
    error: schuleDataError,
    isLoading: schuleDataIsLoading,
  } = useGetSchuleQuery({ BEZEICHNUNG: bezeichnung, STRASSE: strasse });
  const schuleDetails: Schule[] | null = useSelector(selectSchule);

  const {
    data: schulsozialarbeitData,
    error: schulsozialarbeitDataError,
    isLoading: schulsozialarbeitDataIsLoading,
  } = useGetSchulsozialarbeitQuery({
    BEZEICHNUNG: bezeichnung,
    STRASSE: strasse,
  });

  const schulsozialarbeitDetails: Schulsozialarbeit[] | null = useSelector(
    selectSchulsozialarbeit
  );

  if (schuleDataIsLoading) {
    return <div>Loading...</div>;
  }

  if (schuleDataError) {
    return <div>Error fetching schedule data.</div>;
  }

  return (
    <Container>
      {/* <Typography component="h1" variant="h3">
        Schule
      </Typography> */}

      {/* <TextField
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
      /> */}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          mt: 1,
          bgcolor: 'lightgray',

          borderRadius: 2,
        }}
      >
        <Button
          variant={displaySchule ? 'contained' : 'outlined'}
          onClick={(e) => setDisplaySchule((prev) => !prev)}
          startIcon={<SchuleIcon size={40} />}
          disableElevation
          sx={{
            borderRadius: 50,
            mr: 1,
          }}
        >
          Schule
        </Button>
        <Button
          variant={displaySchulsozialarbeit ? 'contained' : 'outlined'}
          onClick={(e) => setDisplaySchulsozialarbeit((prev) => !prev)}
          startIcon={<SchulsozialarbeitIcon size={40} />}
          disableElevation
          sx={{
            borderRadius: 50,
            mr: 1,
          }}
        >
          Schulsozialarbeit
        </Button>
      </Box>

      <MapContainer
        center={userLocation}
        zoom={13}
        className="mt-3 leaflet-map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <MapManager
          userLocation={userLocation}
          setUserLocation={setUserLocation}
        />

        {displaySchule &&
          schuleDetails &&
          schuleDetails.map((schule, index) => (
            <SchuleMapMarker key={index} schule={schule} />
          ))}
        {displaySchulsozialarbeit &&
          schulsozialarbeitDetails &&
          schulsozialarbeitDetails.map((schulsozialarbeit, index) => (
            <SchulsozialarbeitMapMarker
              key={index}
              schulsozialarbeit={schulsozialarbeit}
            />
          ))}
      </MapContainer>
    </Container>
  );
};

export default DashboardPage;
