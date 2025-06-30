import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  getFeeds,
  isLoadingFeed,
  ordersFeed
} from 'src/services/slices/feed-slice/feedSlice';
import { useAppDispatch, useAppSelector } from 'src/services/store';

export const Feed: FC = () => {
  const orders = useAppSelector(ordersFeed);
  const isLoading = useAppSelector(isLoadingFeed);
  const dispatch = useAppDispatch();

  //Загружаем заказы при монтировании компонента
  useEffect(() => {
    if (orders.length === 0) {
      dispatch(getFeeds());
    }
  }, [dispatch, orders.length]);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
      )}
    </>
  );
};
