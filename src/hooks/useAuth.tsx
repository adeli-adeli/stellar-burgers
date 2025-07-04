import {
  isAuthCheckedProfile,
  isAuthProfile
} from 'src/services/slices/profile-slice/profileSlice';
import { useAppSelector } from 'src/services/store';

const useAuth = () => {
  const isAuth = useAppSelector(isAuthProfile);
  const isAuthChecked = useAppSelector(isAuthCheckedProfile);

  return { isAuth, isAuthChecked };
};

export default useAuth;
