import AddRoadIcon from '@mui/icons-material/AddRoad';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Marker, Popup } from 'react-leaflet';
import { Address } from '../types';
import getIcon from '../utils/getIcon';

interface AddressMapMarkerProps {
  address: Address;
  userLocation: [number, number];
}

const AddressMapMarker = ({ address, userLocation }: AddressMapMarkerProps) => {
  return (
    <Marker
      position={
        address.nominatim
          ? [address.nominatim.lat, address.nominatim.lon]
          : userLocation
      }
      icon={
        address.primaryAddress
          ? getIcon('home_address_heart', [40, 40])
          : getIcon('home_address', [30, 30])
      }
    >
      <Popup>
        <Card elevation={0} sx={{ minWidth: '100%' }}>
          <CardHeader
            title={address.street}
            subheader={address.postalCode}
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
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                      <Avatar sx={{ width: 30, height: 30 }}>
                        <AddRoadIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Street"
                      secondary={address.street}
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                    />
                  </ListItem>
                  {address.street2 && (
                    <ListItem sx={{ padding: 0 }}>
                      <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                          <AddRoadIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Street 2"
                        secondary={address.street2}
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
                        <MarkunreadMailboxIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Postal Code"
                      secondary={address.postalCode}
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
                      primary="City"
                      secondary={address.city}
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                    />
                  </ListItem>
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
              title={
                address.primaryAddress
                  ? 'This address is primary address, can be updated in profile'
                  : 'This address can be set as primary address in profile'
              }
            >
              <IconButton aria-label="add to favorites">
                <FavoriteIcon
                  color={address.primaryAddress ? 'error' : 'inherit'}
                />
              </IconButton>
            </Tooltip>
            {/* <Tooltip
              title={'This address is' : 'Add to favorites'}
            >
              <IconButton aria-label="primary">
                <FavoriteIcon
                  color={address.primaryAddress ? 'error' : 'inherit'}
                />
              </IconButton>
            </Tooltip> */}
          </CardActions>
        </Card>
      </Popup>
    </Marker>
  );
};

export default AddressMapMarker;
