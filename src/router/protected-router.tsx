// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import { Preloader } from '@ui';

interface Props {
  children: React.ReactNode;
  onlyUnAuth?: boolean; // Если true — маршрут только для НЕавторизованных
}

const ProtectedRoute = ({ children, onlyUnAuth = false }: Props) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (onlyUnAuth && isAuth) {
    // Пользователь авторизован — не пускаем на страницы /login, /register и т.п.
    return <Navigate to='/' replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    // Пользователь не авторизован, но пытается на защищённую страницу
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
