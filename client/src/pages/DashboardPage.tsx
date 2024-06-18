// src/pages/DashboardPage.tsx
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Skeleton,
  TextField,
  Tooltip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetSchuleQuery } from '../features/schule/schuleApi';
import {
  Jugendberufshilfe,
  Kindertageseinrichtung,
  Schule,
  Schulsozialarbeit,
} from '../types';

import { selectSchule } from '../features/schule/schuleSlice';
import { selectSchulsozialarbeit } from '../features/schulsozialarbeit/schulsozialarbeitSlice';

import {
  MapContainer,
  TileLayer,
  Polygon,
  SVGOverlay,
  useMapEvents,
  Marker,
  Popup,
} from 'react-leaflet';
import MapManager from '../components/MapManager';
import SchuleIcon from '../components/SchuleIcon';
import SchuleMapMarker from '../components/SchuleMapMarker';
import SchulsozialarbeitIcon from '../components/SchulsozialarbeitIcon';
import SchulsozialarbeitMapMarker from '../components/SchulsozialarbeitMapMarker';
import { CHEMNITZ_COORDINATES } from '../constants/appConstants';
import { useGetSchulsozialarbeitQuery } from '../features/schulsozialarbeit/schulsozialarbeitApi';
import { useGetKindertageseinrichtungQuery } from '../features/kindertageseinrichtung/kindertageseinrichtungApi';
import { selectKindertageseinrichtung } from '../features/kindertageseinrichtung/kindertageseinrichtungSlice';
import KindertageseinrichtungMapMarker from '../components/KindertageseinrichtungMapMarker';
import KindertageseinrichtungIcon from '../components/KindertageseinrichtungIcon';
import { useGetJugendberufshilfeQuery } from '../features/jugendberufshilfe/jugendberufshilfeApi';
import { selectJugendberufshilfe } from '../features/jugendberufshilfe/jugendberufshilfeSlice';
import JugendberufshilfeMapMarker from '../components/JugendberufshilfeMapMarker';
import JugendberufshilfeIcon from '../components/JugendberufshilfeIcon';
import { LatLngTuple } from 'leaflet';
import { selectUser } from '../features/user/userSlice';
import { useGetUserQuery } from '../features/user/userApi';
import getIcon from '../utils/getIcon';
import AddressIcon from '../components/AddressIcon';
import AddressMapMarker from '../components/AddressMapMarker';

const DashboardPage = () => {
  const [bezeichnung, setBezeichnung] = useState('');
  const [strasse, setStrasse] = useState('');
  const [zoom, setZoom] = useState(13);
  const [polygonCoordinates, setPolygonCoordinates] = useState<LatLngTuple[]>(
    []
  );

  const { data: userData, error: userDataError } = useGetUserQuery();

  const [userLocation, setUserLocation] =
    useState<[number, number]>(CHEMNITZ_COORDINATES);

  const [displayAddress, setDisplayAddress] = useState(true);
  const [displaySchule, setDisplaySchule] = useState(true);
  const [displaySchulsozialarbeit, setDisplaySchulsozialarbeit] =
    useState(true);
  const [displayKindertageseinrichtung, setDisplayKindertageseinrichtung] =
    useState(true);
  const [displayJugendberufshilfe, setDisplayJugendberufshilfe] =
    useState(true);

  const {
    data: schuleData,
    error: schuleDataError,
    isLoading: schuleDataIsLoading,
    refetch,
  } = useGetSchuleQuery();
  const schuleDetails: Schule[] | null = useSelector(selectSchule);

  const {
    data: schulsozialarbeitData,
    error: schulsozialarbeitDataError,
    isLoading: schulsozialarbeitDataIsLoading,
  } = useGetSchulsozialarbeitQuery({
    BEZEICHNUNG: bezeichnung,
    STRASSE: strasse,
  });

  const {
    data: kindertageseinrichtungData,
    error: kindertageseinrichtungDataError,
    isLoading: kindertageseinrichtungDataIsLoading,
  } = useGetKindertageseinrichtungQuery();

  const {
    data: jugendberufshilfeData,
    error: jugendberufshilfeDataError,
    isLoading: jugendberufshilfeDataIsLoading,
  } = useGetJugendberufshilfeQuery();

  const schulsozialarbeitDetails: Schulsozialarbeit[] | null = useSelector(
    selectSchulsozialarbeit
  );

  const kindertageseinrichtungDetails: Kindertageseinrichtung[] | null =
    useSelector(selectKindertageseinrichtung);

  const jugendberufshilfeDetails: Jugendberufshilfe[] | null = useSelector(
    selectJugendberufshilfe
  );

  if (schuleDataIsLoading) {
    return (
      <Container>
        <Skeleton
          variant="rectangular"
          width={'100%'}
          height={100}
          className="mt-3"
        />
        <Skeleton
          variant="rectangular"
          width={'100%'}
          height={800}
          className="mt-3"
        />
      </Container>
    );
  }

  if (schuleDataError) {
    return <div>Error fetching schedule data.</div>;
  }

  return (
    <Container>
      <Card variant="outlined" className="mt-3">
        <CardContent
          sx={{
            display: 'flex',
            marginTop: 1,
            gap: 1,
            flexWrap: 'wrap',
            // space between
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant={displayAddress ? 'contained' : 'outlined'}
            onClick={(e) => setDisplayAddress((prev) => !prev)}
            startIcon={<AddressIcon size={40} />}
            disableElevation
            sx={{
              borderRadius: 50,
              mr: 1,
            }}
          >
            My Addresses
          </Button>
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
          <Button
            variant={displayKindertageseinrichtung ? 'contained' : 'outlined'}
            onClick={(e) => setDisplayKindertageseinrichtung((prev) => !prev)}
            startIcon={<KindertageseinrichtungIcon size={40} />}
            disableElevation
            sx={{
              borderRadius: 50,
              mr: 1,
            }}
          >
            Kindertageseinrichtung
          </Button>
          <Button
            variant={displayJugendberufshilfe ? 'contained' : 'outlined'}
            onClick={(e) => setDisplayJugendberufshilfe((prev) => !prev)}
            startIcon={<JugendberufshilfeIcon size={40} />}
            disableElevation
            sx={{
              borderRadius: 50,
              mr: 1,
            }}
          >
            jugendberufshilfe
          </Button>
        </CardContent>
      </Card>

      <MapContainer
        center={userLocation}
        zoom={zoom}
        className="mt-3 leaflet-map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        1
        <MapManager
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          zoom={zoom}
        />
        {displayAddress &&
          userData &&
          userData.addresses.map((address: any, index: number) => (
            <AddressMapMarker
              key={index}
              address={address}
              userLocation={userLocation}
            />
          ))}
        {displaySchule &&
          schuleDetails &&
          schuleDetails.map((schule, index) => (
            <SchuleMapMarker
              key={index}
              schule={schule}
              setPolygonCoordinates={setPolygonCoordinates}
              userLocation={userLocation}
              setZoom={setZoom}
              setUserLocation={setUserLocation}
            />
          ))}
        {displaySchulsozialarbeit &&
          schulsozialarbeitDetails &&
          schulsozialarbeitDetails.map((schulsozialarbeit, index) => (
            <SchulsozialarbeitMapMarker
              key={index}
              schulsozialarbeit={schulsozialarbeit}
              setPolygonCoordinates={setPolygonCoordinates}
              userLocation={userLocation}
              setZoom={setZoom}
              setUserLocation={setUserLocation}
            />
          ))}
        {displayKindertageseinrichtung &&
          kindertageseinrichtungDetails &&
          kindertageseinrichtungDetails.map((kindertageseinrichtung, index) => (
            <KindertageseinrichtungMapMarker
              key={index}
              kindertageseinrichtung={kindertageseinrichtung}
              setPolygonCoordinates={setPolygonCoordinates}
              userLocation={userLocation}
              setZoom={setZoom}
              setUserLocation={setUserLocation}
            />
          ))}
        {displayJugendberufshilfe &&
          jugendberufshilfeDetails &&
          jugendberufshilfeDetails.map((jugendberufshilfe, index) => (
            <JugendberufshilfeMapMarker
              key={index}
              jugendberufshilfe={jugendberufshilfe}
              setPolygonCoordinates={setPolygonCoordinates}
              userLocation={userLocation}
              setZoom={setZoom}
              setUserLocation={setUserLocation}
            />
          ))}
        {polygonCoordinates.length > 0 && (
          <Polygon
            pathOptions={{ color: 'purple' }}
            positions={polygonCoordinates}
          />
        )}
      </MapContainer>
    </Container>
  );
};

export default DashboardPage;
