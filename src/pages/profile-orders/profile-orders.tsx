import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getOrders, ordersProfile } from 'src/services/slices/orderSlice';
import { useAppDispatch, useAppSelector } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const orders = useAppSelector(ordersProfile);
  const dispatch = useAppDispatch();

  //Загружаем заказы при монтировании компонента
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
