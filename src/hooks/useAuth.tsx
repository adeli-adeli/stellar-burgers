import {
  isAuthCheckedProfile,
  isAuthProfile
} from 'src/services/slices/profileSlice';
import { useAppSelector } from 'src/services/store';

const useAuth = () => {
  const isAuth = useAppSelector(isAuthProfile);
  const isAuthChecked = useAppSelector(isAuthCheckedProfile);

  return { isAuth, isAuthChecked };
};

export default useAuth;
