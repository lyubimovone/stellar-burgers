import { useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feed';
import {
  selectFeedOrders,
  selectIsFeedLoading
} from '../../services/selectors';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectFeedOrders);
  const isLoading = useAppSelector(selectIsFeedLoading);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
