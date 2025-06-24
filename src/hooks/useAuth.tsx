import { isAuthProfile, selectProfile } from 'src/services/slices/profileSlice';
import { useAppSelector } from 'src/services/store';

const useAuth = () => {
  const isAuth = useAppSelector(isAuthProfile);

  return { isAuth };
};

export default useAuth;
