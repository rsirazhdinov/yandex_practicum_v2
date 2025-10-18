import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
  const user = useSelector((store) => store.auth.user);
  const isAuthChecked = useSelector((store) => store.auth.isAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return (
      <>
        <p className=" mt-20 text text_type_main-medium">Загрузка...</p>
        <Preloader />
      </>
    );
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};
