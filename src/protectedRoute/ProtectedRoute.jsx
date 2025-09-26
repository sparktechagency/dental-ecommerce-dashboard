import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.logInUser);
  const { pathname } = useLocation();

  console.log('Token:', token);
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
};

export default ProtectedRoute;