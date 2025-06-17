import React, { useEffect, useState } from 'react';

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
  }, []);
  return { isAuth };
};

export default useAuth;
