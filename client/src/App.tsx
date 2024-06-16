// src/App.tsx
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from './features/user/userApi';
import { selectToken } from './features/auth/authSlice';
import { useEffect } from 'react';
import ProfilePage from './pages/ProfilePage';

function App() {
  const token = useSelector(selectToken); // Access token from the Redux store
  const { data, error, refetch } = useGetUserQuery(undefined, {
    skip: !token, // Skip the query if no token is present
  });

  useEffect(() => {
    if (token) {
      refetch(); // Trigger a refetch on app load if token exists
    }
  }, [token, refetch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />{' '}
          {/* Added route for /profile */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Private route component which includes the NavBar
function PrivateRoute() {
  const token = localStorage.getItem('token');
  return token ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default App;
