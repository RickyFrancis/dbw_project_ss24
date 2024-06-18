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
import { useNavigate } from 'react-router';
import ErrorComponent from '../components/ErrorComponent';
import {
  useAddAddressMutation,
  useGetUserQuery,
} from '../features/user/userApi';
import { Address } from '../types';
import { addressSchema } from '../validationSchemas';
import { Link } from 'react-router-dom';

const AddAddressPage = () => {
  const [addAddress, { isLoading, error }] = useAddAddressMutation();
  const { refetch } = useGetUserQuery();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit: SubmitHandler<Address> = async (data) => {
    try {
      await addAddress(data).unwrap();
      refetch();
      navigate('/profile', { replace: true });
    } catch (error) {
      console.error('Address Add failed:', error);
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
                Add New Address
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
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
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
              {isLoading ? <CircularProgress size={24} /> : 'Add'}
            </Button>
          </CardActions>
        </Card>
      </Box>
      <ErrorComponent error={error} />
    </Container>
  );
};

export default AddAddressPage;
