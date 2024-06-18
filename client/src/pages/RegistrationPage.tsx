import React from 'react';
import { useRegisterMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Container,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '../validationSchemas';
import ErrorComponent from '../components/ErrorComponent';
import Logo from '../static/logo/logo192.png';
import { APP_NAME } from '../constants/appConstants';
import { RegistrationRequest } from '../types';
import { setToken } from '../features/auth/authSlice';

interface RegistrationFormInputs {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  street: string;
  street2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  primaryAddress?: boolean;
}

const RegistrationPage = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInputs>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<RegistrationFormInputs> = async (data) => {
    const requestData: RegistrationRequest = {
      name: data.name,
      email: data.email,
      password: data.password,
      addresses: [
        {
          street: data.street,
          street2: data.street2,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
          primaryAddress: data.primaryAddress,
        },
      ],
    };

    try {
      const response = await register(requestData).unwrap();
      dispatch(setToken(response.token));
      // Navigate the user to the dashboard or home page, assuming login
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mt: 1 }}>
        <Card variant="outlined">
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                <CardContent>
                  <img
                    src={Logo}
                    alt=""
                    style={{
                      marginLeft: '50px',
                    }}
                  />
                  <Typography
                    component="h1"
                    variant="h5"
                    textAlign={'center'}
                    gutterBottom
                  >
                    {APP_NAME}
                  </Typography>
                  <Typography
                    variant="caption"
                    textAlign={'center'}
                    gutterBottom
                    display={'block'}
                  >
                    Find the institution that best suits your needs
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Typography
              component="h1"
              variant="h3"
              textAlign={'center'}
              color={'text.secondary'}
              gutterBottom
            >
              REGISTER
            </Typography>

            <Divider component="div" />

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    label="Full Name"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                    size="small"
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
                    label="Email Address"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                    size="small"
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
                    required
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
                    required
                    size="small"
                    type="password"
                  />
                )}
              />
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
              {/* Repeat for other fields similarly */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
                disableElevation
              >
                {isLoading ? <CircularProgress size={24} /> : 'Register'}
              </Button>
            </Box>
            <Typography textAlign={'center'}>
              Already have an account?{' '}
              <Button
                color="primary"
                onClick={() => navigate('/login')}
                sx={{ textTransform: 'none' }}
              >
                Login
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <ErrorComponent error={error} />
    </Container>
  );
};

export default RegistrationPage;
