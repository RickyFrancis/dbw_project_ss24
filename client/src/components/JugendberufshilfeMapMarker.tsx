import AddRoadIcon from '@mui/icons-material/AddRoad';
import EmailIcon from '@mui/icons-material/Email';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FaxIcon from '@mui/icons-material/Fax';
import PhoneIcon from '@mui/icons-material/LocalPhone';
import NearMeIcon from '@mui/icons-material/NearMe';
import InfoIcon from '@mui/icons-material/Info';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import LocationCityIcon from '@mui/icons-material/LocationCity';
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
  JUGENDBERUFSHILFE_API_EXCLUDES,
  JUGENDBERUFSHILFE_EXCLUDES,
} from '../constants/appConstants';
import { useGetReverseGeocodeQuery } from '../features/jugendberufshilfe/jugendberufshilfeApi';
import {
  useGetDistanceMutation,
  useGetUserQuery,
  useToggleFavoriteJugendMutation,
  useToggleFavoriteKinderMutation,
} from '../features/user/userApi';
import { Address, GenericObject, Jugendberufshilfe } from '../types';
import extractCoordinates from '../utils/extractCoordinates';
import flattenObject from '../utils/flattenObject';
import getIcon from '../utils/getIcon';

interface JugendberufshilfeMarkerProps {
  jugendberufshilfe: Jugendberufshilfe;
  setPolygonCoordinates: any;
  userLocation: [number, number];
  setZoom: any;
  setUserLocation: any;
}

const JugendberufshilfeMapMarker = ({
  jugendberufshilfe,
  setPolygonCoordinates,
  userLocation,
  setZoom,
  setUserLocation,
}: JugendberufshilfeMarkerProps) => {
  const { data, error: userDataError, refetch } = useGetUserQuery();

  const isFavorite = data?.favoriteJugend.some(
    (favoriteJugendberufshilfe: Jugendberufshilfe) =>
      favoriteJugendberufshilfe.id === jugendberufshilfe.id
  );

  // Find the primaryAddress
  const primaryAddress = data?.addresses.find(
    (address: Address) => address.primaryAddress === true
  );

  const [
    toggleFavoriteJugend,
    { error: removeFavoriteJugendberufshilfeError },
  ] = useToggleFavoriteJugendMutation();

  const [fetchOnDemand, setFetchOnDemand] = useState(false); // State to control fetching

  // Use the query with controlled skipping based on state
  const { data: reverseGeocodeData, isLoading } = useGetReverseGeocodeQuery(
    { lat: jugendberufshilfe.y, lon: jugendberufshilfe.x },
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
          latitude: jugendberufshilfe.y,
          longitude: jugendberufshilfe.x,
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

  const handleToggleFavoriteJugend = async (id: number) => {
    try {
      await toggleFavoriteJugend({ id });
      refetch();
    } catch (error) {
      console.error('Toggle favorite failed:', error);
    }
  };

  const handleFetchReverseGeocode = () => {
    setFetchOnDemand(true); // Trigger the query by updating state
    setZoom(17);
    setUserLocation([jugendberufshilfe.y, jugendberufshilfe.x]);
  };

  useEffect(() => {
    // Check if reverse geocode data is available and update parent's state
    if (reverseGeocodeData) {
      setPolygonCoordinates(extractCoordinates(reverseGeocodeData.svg));
    }
  }, [reverseGeocodeData, setPolygonCoordinates]);

  return (
    <Marker
      position={[jugendberufshilfe.y, jugendberufshilfe.x]}
      icon={
        isFavorite
          ? getIcon('jugendberufshilfe_2_64_heart', [40, 40])
          : getIcon('jugendberufshilfe_2_64', [30, 30])
      }
    >
      <Popup>
        <Card elevation={0} sx={{ minWidth: '100%' }}>
          <CardHeader
            title={jugendberufshilfe.TRAEGER}
            subheader={jugendberufshilfe.LEISTUNGEN}
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
                  {jugendberufshilfe.BEZEICHNUNG && (
                    <ListItem sx={{ padding: 0 }}>
                      <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                          <InfoIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="BEZEICHNUNG"
                        secondary={jugendberufshilfe.BEZEICHNUNG}
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
                      secondary={jugendberufshilfe.STRASSE}
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
                      secondary={jugendberufshilfe.PLZ}
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
                      secondary={jugendberufshilfe.ORT}
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                    />
                  </ListItem>

                  {jugendberufshilfe.TELEFON && (
                    <ListItem sx={{ padding: 0 }}>
                      <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                          <PhoneIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Phone"
                        secondary={
                          <a href={`tel:${jugendberufshilfe.TELEFON}`}>
                            {jugendberufshilfe.TELEFON}
                          </a>
                        }
                        primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                        secondaryTypographyProps={{
                          sx: { fontSize: '0.8rem' },
                        }}
                      />
                    </ListItem>
                  )}

                  {jugendberufshilfe.FAX && (
                    <ListItem sx={{ padding: 0 }}>
                      <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                          <FaxIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="FAX"
                        secondary={jugendberufshilfe.FAX}
                        primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                        secondaryTypographyProps={{
                          sx: { fontSize: '0.8rem' },
                        }}
                      />
                    </ListItem>
                  )}

                  {jugendberufshilfe.EMAIL && (
                    <ListItem sx={{ padding: 0 }}>
                      <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                          <EmailIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Email"
                        secondary={
                          <a href={`mailto:${jugendberufshilfe.EMAIL}`}>
                            {jugendberufshilfe.EMAIL}
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
                onClick={() => handleToggleFavoriteJugend(jugendberufshilfe.id)}
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
                  jugendberufshilfe,
                  JUGENDBERUFSHILFE_EXCLUDES
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
                      JUGENDBERUFSHILFE_API_EXCLUDES
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

export default JugendberufshilfeMapMarker;
