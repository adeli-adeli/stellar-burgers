import { useAppDispatch, useAppSelector } from 'src/services/store';

import React, { useEffect } from 'react';
import { profileUser } from 'src/services/slices/profileSlice';

const useAuth = () => {
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuth) {
      dispatch(profileUser());
    }
  }, [isAuth, dispatch]);
  return { isAuth };
};

export default useAuth;
