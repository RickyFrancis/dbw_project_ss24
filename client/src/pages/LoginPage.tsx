import React from 'react';
import { useLoginMutation } from '../features/auth/authApi';
import { setToken } from '../features/auth/authSlice';
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
  Divider,
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validationSchemas';
import ErrorComponent from '../components/ErrorComponent';
import Logo from '../static/logo/logo192.png';
import { APP_NAME } from '../constants/appConstants';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setToken(response.token));
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
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
              LOGIN
            </Typography>

            <Divider component="div" />

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
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
                    type="password"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                    size="small"
                  />
                )}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
                disableElevation
              >
                {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
            </Box>
            <Typography textAlign={'center'}>
              Don't have an account?{' '}
              <Button
                color="primary"
                onClick={() => navigate('/register')}
                sx={{ textTransform: 'none' }}
              >
                Register
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <ErrorComponent error={error} />
    </Container>
  );
};

export default LoginPage;
