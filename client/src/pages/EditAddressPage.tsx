import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import ErrorComponent from '../components/ErrorComponent';
import {
  useEditAddressMutation,
  useGetAddressQuery,
  useGetUserQuery,
} from '../features/user/userApi';
import { Address } from '../types';
import { addressSchema } from '../validationSchemas';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const EditAddressPage = () => {
  const { id } = useParams();
  const {
    data: addressData,
    error: addressDataError,
    isLoading: addressDataLoading,
    refetch: refetchAddress,
  } = useGetAddressQuery({ id: Number(id) });
  const [editAddress, { isLoading, error }] = useEditAddressMutation();
  const { refetch } = useGetUserQuery();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Address>({
    resolver: zodResolver(addressSchema),
    defaultValues: addressData ? addressData : {},
  });

  // UseEffect to update form values when addressData is available
  useEffect(() => {
    if (addressData) {
      reset(addressData); // Resets the form with new data
    }
  }, [addressData, reset]);

  const onSubmit: SubmitHandler<Address> = async (data) => {
    try {
      await editAddress({ id: Number(id), addressData: data }).unwrap();
      refetch();
      refetchAddress();
      navigate('/profile', { replace: true });
    } catch (error) {
      console.error('Address Edit failed:', error);
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
                Update Address
              </Typography>
            </Box>
            <Controller
              name="street"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Street"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  required
                  size="small"
                  type="text"
                />
              )}
            />
            <Controller
              name="street2"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Street 2"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  size="small"
                  type="text"
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="City"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  required
                  size="small"
                  type="text"
                />
              )}
            />
            <Controller
              name="state"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="State"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  size="small"
                  type="text"
                />
              )}
            />
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Postal Code"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  required
                  size="small"
                  type="text"
                />
              )}
            />
            <Controller
              name="country"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Country"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  required
                  size="small"
                  type="text"
                />
              )}
            />

            <Controller
              name="primaryAddress"
              control={control}
              defaultValue={false} // This default value is redundant if you are using reset to set values
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox checked={field.value} onChange={field.onChange} />
                  }
                  label="Primary Address"
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

export default EditAddressPage;
