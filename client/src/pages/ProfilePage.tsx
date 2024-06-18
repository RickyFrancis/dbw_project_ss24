// src/pages/ProfilePage.tsx

import EmailIcon from '@mui/icons-material/Email';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ErrorComponent from '../components/ErrorComponent';
import {
  useDeleteAddressMutation,
  useDeleteUserMutation,
  useGetUserQuery,
  useToggleFavoriteJugendMutation,
  useToggleFavoriteKinderMutation,
  useToggleFavoriteSchuleMutation,
  useToggleFavoriteSchulsozialarbeitMutation,
} from '../features/user/userApi';
import {
  Address,
  Jugendberufshilfe,
  Kindertageseinrichtung,
  Schule,
  Schulsozialarbeit,
} from '../types';
import { logout } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, error: userDataError, refetch } = useGetUserQuery();
  const [deleteUser, { isLoading: deleteUserLoading, error: deleteUserError }] =
    useDeleteUserMutation();
  const [deleteAddress, { isLoading, error: deleteAddressError }] =
    useDeleteAddressMutation();

  const [toggleFavoriteSchule, { error: removeFavoriteSchuleError }] =
    useToggleFavoriteSchuleMutation();

  const [toggleFavoriteKinder, { error: removeFavoriteKinderError }] =
    useToggleFavoriteKinderMutation();

  const [toggleFavoriteJugend, { error: removeFavoriteJugendError }] =
    useToggleFavoriteJugendMutation();

  const [toggleFavoriteSozial, { error: removeFavoriteSozialError }] =
    useToggleFavoriteSchulsozialarbeitMutation();

  const handleDeleteAddress = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this address?'
      );
      if (confirmDelete) {
        await deleteAddress({ id });
      }
      refetch();
    } catch (error) {
      console.error('Delete address failed:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const confirmDelete = window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      );
      if (confirmDelete) {
        await deleteUser();
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error('Delete user failed:', error);
    }
  };

  const handleRemoveFavoriteSchule = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        'Are you sure you want to remove this Schule from favorites?'
      );
      if (confirmDelete) {
        await toggleFavoriteSchule({ id });
      }
      refetch();
    } catch (error) {
      console.error('Delete address failed:', error);
    }
  };

  const handleRemoveFavoriteKinder = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        'Are you sure you want to remove this Kindertageseinrichtung from favorites?'
      );
      if (confirmDelete) {
        await toggleFavoriteKinder({ id });
      }
      refetch();
    } catch (error) {
      console.error('Delete address failed:', error);
    }
  };

  const handleRemoveFavoriteJugend = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        'Are you sure you want to remove this Jugendberufshilfe from favorites?'
      );
      if (confirmDelete) {
        await toggleFavoriteJugend({ id });
      }
      refetch();
    } catch (error) {
      console.error('Delete address failed:', error);
    }
  };

  const handleRemoveFavoriteSozial = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        'Are you sure you want to remove this Schulsozialarbeit from favorites?'
      );
      if (confirmDelete) {
        await toggleFavoriteSozial({ id });
      }
      refetch();
    } catch (error) {
      console.error('Delete address failed:', error);
    }
  };

  return (
    <Container>
      <Grid container mt={2} mb={2} spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                component="h2"
                variant="h4"
                pl={2}
                pt={2}
                color={'text.secondary'}
              >
                Profile
              </Typography>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Avatar />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Name" secondary={data?.name} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EmailIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Email" secondary={data?.email} />
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              <Link to="/profile/update">
                <Button>Update Profile</Button>{' '}
              </Link>
              <Link to="/profile/address/add">
                <Button>Add New Address</Button>
              </Link>
              <Button color="error" onClick={handleDeleteUser}>
                Delete Account
              </Button>
            </CardActions>
          </Card>
        </Grid>
        {data?.addresses?.map((address: Address, index: number) => (
          <Grid item xs={12} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  component="h2"
                  variant="h5"
                  pl={2}
                  pt={2}
                  color={'text.secondary'}
                >
                  Address #{index + 1}
                </Typography>
                <List
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'start',
                  }}
                  key={index}
                >
                  <ListItem>
                    <ListItemText primary="Street" secondary={address.street} />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary="Street 2"
                      secondary={address.street2}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="City" secondary={address.city} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Postal Code"
                      secondary={address.postalCode}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="State" secondary={address.state} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Country"
                      secondary={address.country}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Primary Address"
                      secondary={address.primaryAddress ? 'Yes' : 'No'}
                    />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Link to={`/profile/address/edit/${address.id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button
                  color="error"
                  onClick={(e) => handleDeleteAddress(address.id!)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {data?.favoriteSchules?.map((schule: Schule, index: number) => (
          <Grid item xs={12} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  component="h2"
                  variant="h5"
                  pl={2}
                  pt={2}
                  color={'text.secondary'}
                >
                  Favorite Schule #{index + 1}
                </Typography>
                <List
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'start',
                  }}
                  key={index}
                >
                  <ListItem>
                    <ListItemText
                      primary="BEZEICHNUNG"
                      secondary={schule.BEZEICHNUNG}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="ART" secondary={schule.ART} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="STRASSE"
                      secondary={schule.STRASSE}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="ORT" secondary={schule.ORT} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="PLZ" secondary={schule.PLZ} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="TELEFON"
                      secondary={schule.TELEFON}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="EMAIL" secondary={schule.EMAIL} />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Button
                  color="error"
                  onClick={(e) => handleRemoveFavoriteSchule(schule.id!)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {data?.favoriteKinder?.map(
          (kinder: Kindertageseinrichtung, index: number) => (
            <Grid item xs={12} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    component="h2"
                    variant="h5"
                    pl={2}
                    pt={2}
                    color={'text.secondary'}
                  >
                    Favorite Kindertageseinrichtung #{index + 1}
                  </Typography>
                  <List
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'start',
                    }}
                    key={index}
                  >
                    <ListItem>
                      <ListItemText
                        primary="BEZEICHNUNG"
                        secondary={kinder.BEZEICHNUNG}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="TRAEGER"
                        secondary={kinder.TRAEGER}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="STRASSE"
                        secondary={kinder.STRASSE}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="ORT" secondary={kinder.ORT} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="PLZ" secondary={kinder.PLZ} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="TELEFON"
                        secondary={kinder.TELEFON}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="EMAIL" secondary={kinder.EMAIL} />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Button
                    color="error"
                    onClick={(e) => handleRemoveFavoriteKinder(kinder.id!)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
        {data?.favoriteJugend?.map(
          (jugend: Jugendberufshilfe, index: number) => (
            <Grid item xs={12} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    component="h2"
                    variant="h5"
                    pl={2}
                    pt={2}
                    color={'text.secondary'}
                  >
                    Favorite Jugendberufshilfe #{index + 1}
                  </Typography>
                  <List
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'start',
                    }}
                    key={index}
                  >
                    <ListItem>
                      <ListItemText
                        primary="LEISTUNGEN"
                        secondary={jugend.LEISTUNGEN}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="TRAEGER"
                        secondary={jugend.TRAEGER}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="STRASSE"
                        secondary={jugend.STRASSE}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="ORT" secondary={jugend.ORT} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="PLZ" secondary={jugend.PLZ} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="TELEFON"
                        secondary={jugend.TELEFON}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="EMAIL" secondary={jugend.EMAIL} />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Button
                    color="error"
                    onClick={(e) => handleRemoveFavoriteJugend(jugend.id!)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
        {data?.favoriteSozial?.map(
          (sozial: Schulsozialarbeit, index: number) => (
            <Grid item xs={12} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    component="h2"
                    variant="h5"
                    pl={2}
                    pt={2}
                    color={'text.secondary'}
                  >
                    Favorite Schulsozialarbeit #{index + 1}
                  </Typography>
                  <List
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'start',
                    }}
                    key={index}
                  >
                    <ListItem>
                      <ListItemText
                        primary="LEISTUNGEN"
                        secondary={sozial.LEISTUNGEN}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="TRAEGER"
                        secondary={sozial.TRAEGER}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="STRASSE"
                        secondary={sozial.STRASSE}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="ORT" secondary={sozial.ORT} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="PLZ" secondary={sozial.PLZ} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="TELEFON"
                        secondary={sozial.TELEFON}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="EMAIL" secondary={sozial.EMAIL} />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Button
                    color="error"
                    onClick={(e) => handleRemoveFavoriteSozial(sozial.id!)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
      </Grid>
      <ErrorComponent error={deleteAddressError} />
      <ErrorComponent error={userDataError} />
      <ErrorComponent error={removeFavoriteSchuleError} />
      <ErrorComponent error={removeFavoriteKinderError} />
      <ErrorComponent error={removeFavoriteJugendError} />
      <ErrorComponent error={removeFavoriteSozialError} />
    </Container>
  );
};

export default ProfilePage;
