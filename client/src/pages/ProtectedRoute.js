import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useGlobalContext();
  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};

{
  /* <Navigate to="/login" />; */
}

export default ProtectedRoute;
