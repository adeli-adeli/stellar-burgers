import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/services/store';
import { getFeeds } from 'src/services/slices/feedSlice';

export const Feed: FC = () => {
  const { orders, isLoading } = useAppSelector((state) => state.feedSlice);
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  let interval: NodeJS.Timeout;

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(getFeeds());
    }

    // TODO: сделать подписку на вебсокет
    // interval = setInterval(() => {
    //   dispatch(getFeeds());
    // }, 5000);

    // return () => clearInterval(interval);
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
