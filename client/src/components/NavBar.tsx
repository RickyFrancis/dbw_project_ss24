import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { APP_NAME } from '../constants/appConstants';
import Logo from '../static/logo/logo192.png';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import { logout } from '../features/auth/authSlice';
import { useDispatch } from '../hooks';
import { selectUser, selectUserStatus } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const pages = [
  {
    name: 'Dashboard',
    path: '/',
  },
  {
    name: 'Profile',
    path: '/profile',
  },
];
const settings = [
  {
    name: 'Profile',
    path: '/profile',
  },
];

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // the current path
  const currentPath = window.location.pathname;
  console.log(currentPath);

  const user = useSelector(selectUser);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link to="/">
              <img
                src={Logo}
                alt={`${APP_NAME} Logo`}
                width={35}
                style={{ marginRight: '5px' }}
              />
            </Link>
          </Box>

          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            <Link to="/">{APP_NAME}</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={(e) => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                  sx={{
                    backgroundColor:
                      currentPath === page.path ? 'rgba(0, 0, 0, 0.1)' : 'none',
                  }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <img src={Logo} alt={`${APP_NAME} Logo`} width={25} />
          </Box>

          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            {APP_NAME}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={(e) => {
                  handleCloseNavMenu();
                  navigate(page.path);
                }}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  border:
                    currentPath === page.path ? '1px solid white' : 'none',
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user ? user.name : ''} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={(e) => {
                    handleCloseUserMenu();
                    navigate(setting.path);
                  }}
                  sx={{
                    backgroundColor:
                      currentPath === setting.path
                        ? 'rgba(0, 0, 0, 0.1)'
                        : 'none',
                  }}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}

              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">
                  Logout{' '}
                  <IconButton size="small">
                    <LogoutIcon />
                  </IconButton>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
