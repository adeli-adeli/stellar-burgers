// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import { Preloader } from '@ui';

interface Props {
  children: React.ReactNode;
  onlyUnAuth?: boolean; // Если true — маршрут только для НЕавторизованных
}

const ProtectedRoute = ({ children, onlyUnAuth = false }: Props) => {
  const { isAuth, isAuthChecked } = useAuth();
  const location = useLocation();

  // Ждем ответа, авторизован пользователь или нет
  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuth) {
    // Редирект пользователя туда, откуда он пришел или на '/'
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    // Редирект на '/login' и сохраняем текущий путь
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
