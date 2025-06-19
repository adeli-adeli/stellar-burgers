import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getOrders } from 'src/services/slices/orderSlice';
import { useAppDispatch, useAppSelector } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const { orders } = useAppSelector((state) => state.orderSlice);



  return <ProfileOrdersUI orders={orders} />;
};
