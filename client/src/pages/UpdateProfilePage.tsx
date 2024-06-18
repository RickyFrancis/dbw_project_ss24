import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import ErrorComponent from '../components/ErrorComponent';
import {
  useUpdateUserMutation,
  useGetUserQuery,
} from '../features/user/userApi';
import { ProfileUpdate } from '../types';
import { profileUpdateSchema } from '../validationSchemas';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const UpdateProfilePage = () => {
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  const { data: userData, error: userDataError, refetch } = useGetUserQuery();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileUpdate>({
    resolver: zodResolver(profileUpdateSchema),
  });

  // UseEffect to update form values when addressData is available
  useEffect(() => {
    if (userData) {
      reset(userData); // Resets the form with new data
    }
  }, [userData, reset]);

  const onSubmit: SubmitHandler<ProfileUpdate> = async (data) => {
    try {
      await updateUser(data).unwrap();
      refetch();
      navigate('/profile', { replace: true });
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  return (
    <Container
      sx={{
        mt: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Card variant="outlined">
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
              mb={2}
            >
              <Typography component="h1" variant="h4" color={'text.secondary'}>
                Update Profile
              </Typography>
            </Box>

            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Name"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  required
                  size="small"
                  type="text"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Email"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  required
                  size="small"
                  type="email"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Password"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  size="small"
                  type="password"
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Confirm Password"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  size="small"
                  type="password"
                />
              )}
            />
          </CardContent>
          <CardActions>
            <Link to="/profile">
              <Button disabled={isLoading} color="warning">
                Back
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : 'Update'}
            </Button>
          </CardActions>
        </Card>
      </Box>
      <ErrorComponent error={error} />
    </Container>
  );
};

export default UpdateProfilePage;
