import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { useAppSelector } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const { orders } = useAppSelector((state) => state.feedSlice);

  return <ProfileOrdersUI orders={orders} />;
};
