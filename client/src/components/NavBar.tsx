import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { useDispatch } from '../hooks';

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Integrated logout action using Redux
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
              Dashboard
            </Typography>
          </Button>
          <Button color="inherit" onClick={() => navigate('/profile')}>
            <Typography variant="h6" component="div">
              Profile
            </Typography>
          </Button>
        </Box>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
