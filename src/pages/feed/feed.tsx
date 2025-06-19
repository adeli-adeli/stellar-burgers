import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getOrders } from 'src/services/slices/orderSlice';
import { useAppDispatch, useAppSelector } from 'src/services/store';

export const Feed: FC = () => {
  const { orders } = useAppSelector((state) => state.orderSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(getOrders());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
