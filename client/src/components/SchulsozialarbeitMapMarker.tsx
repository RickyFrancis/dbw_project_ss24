import AddRoadIcon from '@mui/icons-material/AddRoad';
import EmailIcon from '@mui/icons-material/Email';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FaxIcon from '@mui/icons-material/Fax';
import PhoneIcon from '@mui/icons-material/LocalPhone';
import NearMeIcon from '@mui/icons-material/NearMe';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import InfoIcon from '@mui/icons-material/Info';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import {
  SCHULSOZIALARBEIT_API_EXCLUDES,
  SCHULSOZIALARBEIT_EXCLUDES,
} from '../constants/appConstants';
import { useGetReverseGeocodeQuery } from '../features/schulsozialarbeit/schulsozialarbeitApi';
import {
  useGetDistanceMutation,
  useGetUserQuery,
  useToggleFavoriteSchulsozialarbeitMutation,
} from '../features/user/userApi';
import { Address, GenericObject, Schulsozialarbeit } from '../types';
import extractCoordinates from '../utils/extractCoordinates';
import flattenObject from '../utils/flattenObject';
import getIcon from '../utils/getIcon';

interface SchulsozialarbeitMarkerProps {
  schulsozialarbeit: Schulsozialarbeit;
  setPolygonCoordinates: any;
  userLocation: [number, number];
  setZoom: any;
  setUserLocation: any;
}

const SchulsozialarbeitMapMarker = ({
  schulsozialarbeit,
  setPolygonCoordinates,
  userLocation,
  setZoom,
  setUserLocation,
}: SchulsozialarbeitMarkerProps) => {
  const [fetchOnDemand, setFetchOnDemand] = useState(false); // State to control fetching
  const { data, error: userDataError, refetch } = useGetUserQuery();

  const isFavorite = data?.favoriteSozial.some(
    (favoriteSchulsozialarbeit: Schulsozialarbeit) =>
      favoriteSchulsozialarbeit.id === schulsozialarbeit.id
  );

  // Find the primaryAddress
  const primaryAddress = data?.addresses.find(
    (address: Address) => address.primaryAddress === true
  );

  const [
    toggleFavoriteSchulsozialarbeit,
    { error: removeFavoriteSchulsozialarbeitError },
  ] = useToggleFavoriteSchulsozialarbeitMutation();

  // Use the query with controlled skipping based on state
  const { data: reverseGeocodeData, isLoading } = useGetReverseGeocodeQuery(
    { lat: schulsozialarbeit.y, lon: schulsozialarbeit.x },
    { skip: !fetchOnDemand } // Dynamically skip based on state
  );

  const [
    getDistance,
    {
      data: distanceData,
      isLoading: isDistanceLoading,
      isError: isDistanceError,
    },
  ] = useGetDistanceMutation();

  const handleGetDistance = async () => {
    try {
      await getDistance({
        coords1: {
          latitude: primaryAddress?.nominatim?.lat
            ? primaryAddress.nominatim.lat
            : userLocation[0],
          longitude: primaryAddress?.nominatim?.lon
            ? primaryAddress.nominatim.lon
            : userLocation[1],
        },
        coords2: {
          latitude: schulsozialarbeit.y,
          longitude: schulsozialarbeit.x,
        },
      });
    } catch (error) {
      console.error('Failed to get distance:', error);
    }
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    handleFetchReverseGeocode();
  };

  const handleToggleFavoriteSchulsozialarbeit = async (id: number) => {
    try {
      await toggleFavoriteSchulsozialarbeit({ id });
      refetch();
    } catch (error) {
      console.error('Toggle favorite failed:', error);
    }
  };

  const handleFetchReverseGeocode = () => {
    setFetchOnDemand(true); // Trigger the query by updating state
    setZoom(17);
    setUserLocation([schulsozialarbeit.y, schulsozialarbeit.x]);
  };

  useEffect(() => {
    // Check if reverse geocode data is available and update parent's state
    if (reverseGeocodeData) {
      setPolygonCoordinates(extractCoordinates(reverseGeocodeData.svg));
    }
  }, [reverseGeocodeData, setPolygonCoordinates]);

  return (
    <Marker
      position={[schulsozialarbeit.y, schulsozialarbeit.x]}
      icon={
        isFavorite
          ? getIcon('schulsozialarbeit_2_64_heart', [40, 40])
          : getIcon('schulsozialarbeit_2_64', [30, 30])
      }
    >
      <Popup>
        <Card elevation={0} sx={{ minWidth: '100%' }}>
          <CardHeader
            title={schulsozialarbeit.TRAEGER}
            subheader={schulsozialarbeit.LEISTUNGEN}
            sx={{
              p: 0,
            }}
          />

          <CardContent
            sx={{
              p: 0,
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <List
                  sx={{
                    flexWrap: 'wrap',
                  }}
                >
                  {schulsozialarbeit.BEZEICHNUNG && (
                    <ListItem sx={{ padding: 0 }}>
                      <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                          <InfoIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="BEZEICHNUNG"
                        secondary={schulsozialarbeit.BEZEICHNUNG}
                        primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                        secondaryTypographyProps={{
                          sx: { fontSize: '0.8rem' },
                        }}
                      />
                    </ListItem>
                  )}

                  <ListItem sx={{ padding: 0 }}>
                    <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                      <Avatar sx={{ width: 30, height: 30 }}>
                        <AddRoadIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="STRASSE"
                      secondary={schulsozialarbeit.STRASSE}
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                      <Avatar sx={{ width: 30, height: 30 }}>
                        <MarkunreadMailboxIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="PLZ"
                      secondary={schulsozialarbeit.PLZ}
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                      <Avatar sx={{ width: 30, height: 30 }}>
                        <LocationCityIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="ORT"
                      secondary={schulsozialarbeit.ORT}
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                    />
                  </ListItem>

                  {schulsozialarbeit.TELEFON && (
                    <ListItem sx={{ padding: 0 }}>
                      <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                          <PhoneIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Phone"
                        secondary={
                          <a href={`tel:${schulsozialarbeit.TELEFON}`}>
                            {schulsozialarbeit.TELEFON}
                          </a>
                        }
                        primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                        secondaryTypographyProps={{
                          sx: { fontSize: '0.8rem' },
                        }}
                      />
                    </ListItem>
                  )}

                  {schulsozialarbeit.FAX && (
                    <ListItem sx={{ padding: 0 }}>
                      <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                          <FaxIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="FAX"
                        secondary={schulsozialarbeit.FAX}
                        primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                        secondaryTypographyProps={{
                          sx: { fontSize: '0.8rem' },
                        }}
                      />
                    </ListItem>
                  )}

                  {schulsozialarbeit.EMAIL && (
                    <ListItem sx={{ padding: 0 }}>
                      <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                          <EmailIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Email"
                        secondary={
                          <a href={`mailto:${schulsozialarbeit.EMAIL}`}>
                            {schulsozialarbeit.EMAIL}
                          </a>
                        }
                        primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                        secondaryTypographyProps={{
                          sx: { fontSize: '0.8rem' },
                        }}
                      />
                    </ListItem>
                  )}

                  {!isDistanceLoading && !isDistanceError && distanceData && (
                    <ListItem sx={{ padding: 0 }}>
                      <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                          <NearMeIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Distance from ${
                          primaryAddress?.street
                            ? primaryAddress.street
                            : 'Primary Address'
                        }`}
                        secondary={`${distanceData.distance} km`}
                        primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                        secondaryTypographyProps={{
                          sx: { fontSize: '0.8rem' },
                        }}
                      />
                    </ListItem>
                  )}
                </List>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            disableSpacing
            sx={{
              p: 0,
            }}
          >
            <Tooltip
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <IconButton
                aria-label="add to favorites"
                onClick={() =>
                  handleToggleFavoriteSchulsozialarbeit(schulsozialarbeit.id)
                }
              >
                <FavoriteIcon color={isFavorite ? 'error' : 'inherit'} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Distance from Primary Address">
              <IconButton
                aria-label="distance"
                onClick={handleGetDistance}
                disabled={isLoading}
              >
                <NearMeIcon color={distanceData ? 'primary' : 'inherit'} />
              </IconButton>
            </Tooltip>
            <Button
              onClick={handleExpandClick}
              size="small"
              sx={{
                marginLeft: 'auto',
              }}
            >
              Show More
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className="more-info-card">
              <Stack
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={0}
              >
                {flattenObject(
                  schulsozialarbeit,
                  SCHULSOZIALARBEIT_EXCLUDES
                ).map((property) => (
                  <div key={property.name}>
                    <Typography variant="overline" color="text.secondary">
                      {property.name}
                    </Typography>
                    &nbsp;
                    <Typography variant="caption">{property.value}</Typography>
                  </div>
                ))}
                <Divider />
                {reverseGeocodeData ? (
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    mt={1}
                    gutterBottom
                  >
                    More info from Nominatim
                  </Typography>
                ) : null}
                <Divider />
                {reverseGeocodeData
                  ? flattenObject(
                      reverseGeocodeData,
                      SCHULSOZIALARBEIT_API_EXCLUDES
                    ).map((property: GenericObject) => (
                      <div key={property.name}>
                        <Typography variant="overline" color="text.secondary">
                          {property.name}
                        </Typography>
                        &nbsp;
                        <Typography variant="caption">
                          {property.value}
                        </Typography>
                      </div>
                    ))
                  : null}
              </Stack>
            </CardContent>
          </Collapse>
        </Card>
      </Popup>
    </Marker>
  );
};

export default SchulsozialarbeitMapMarker;
